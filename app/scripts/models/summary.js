define([
  'underscore',
  'backbone',
  'collections/user',
  'config/questions-data',
  'models/user',
  'repositories/user'
], function (_, Backbone, UserCollection, QuestionsData, UserModel, UserRepository) {
  'use strict';

  var SummaryModel = Backbone.Model.extend({
    answersPercentage: {},

    initialize: function(options) {
      var answersStats = this.buildAnswersStats();
      this.buildAnswersPercentage(answersStats);

      this.attributes = options.userModel.attributes;
      this.set('questions', this.mergeQuestions(this.get('questions')));
    },

    buildAnswersStats: function() {
      var answersStats, userCollection;

      answersStats = {};
      userCollection = new UserCollection();
      userCollection.fetch();

      userCollection.forEach(function(userModel) {
        _.each(userModel.get('questions'), function(question) {
          if (!answersStats[question.id]) {
            answersStats[question.id] = [];
          }

          _.each(question.answers, function(answer) {
            answersStats[question.id][answer] = answersStats[question.id][answer] + 1 || 1;
          });
        });
      });

      return answersStats;
    },

    buildAnswersPercentage: function(answersStats) {
      var self, totalUsers;

      self = this;
      totalUsers = UserRepository.getTotalUsers();

      _.each(answersStats, function(answers, questionId) {
        if (!self.answersPercentage[questionId]) {
          self.answersPercentage[questionId] =
            Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
        }

        _.each(answers, function(answer, answerId) {
          self.answersPercentage[questionId][answerId] =
            answer / totalUsers * 100;
        });
      });
    },

    mergeQuestions: function(answeredQuestions) {
      var questions, self;

      self = this;
      questions = [];

      _.each(answeredQuestions, function(answeredQuestion) {
        var question, originalQuestion, userAnswers;

        originalQuestion = _.findWhere(QuestionsData, { id: parseInt(answeredQuestion.id, 10) });
        question = {
          id: originalQuestion.id,
          question: originalQuestion.question,
          answers: []
        };

        _.each(originalQuestion.answers, function(originalAnswer, index) {
          var className;

          if (_.contains(originalQuestion.correctAnswers, index)) {
            className = 'correct';
          }
          else {
            className = 'incorrect';
          }

          if (_.contains(answeredQuestion.answers, index)) {
            className += ' answered';
          }

          question.answers.push({
            answer: originalAnswer,
            result: {
              className: className,
              percentage: self.answersPercentage[question.id][index]
            }
          });
        });

        questions.push(question);
      });

      return questions;
    }
  });

  return SummaryModel;
});
