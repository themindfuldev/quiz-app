define([
  'underscore',
  'backbone',
  'config/common',
  'config/questions-data',
  'models/user'
], function (_, Backbone, Common, QuestionsData, UserModel) {
  'use strict';

  var SummaryModel = Backbone.Model.extend({
    answersPercentage: {},

    initialize: function() {
      var answersStats;

      answersStats = this.buildAnswersStats();

      this.buildAnswersPercentage(answersStats);
    },

    buildAnswersStats: function() {
      var answersStats, usersSequence, userId, userModel;

      answersStats = {};
      usersSequence = localStorage.getItem(Common.Repositories.usersSequence);

      for (userId = 1; userId <= usersSequence; userId++) {
        userModel = new UserModel({ id: userId });
        userModel.fetch();

        _.each(userModel.get('questions'), function(question) {
          if (!answersStats[question.id]) {
            answersStats[question.id] = [];
          }

          _.each(question.answers, function(answer) {
            answersStats[question.id][answer] = answersStats[question.id][answer] + 1 || 1;
          });
        });
      }

      return answersStats;
    },

    buildAnswersPercentage: function(answersStats) {
      var self, answerTotals;

      self = this;
      answerTotals = [];

      _.each(answersStats, function(answers, questionId) {
        answerTotals[questionId] = _.reduce(answers, function(total, num){
          return total + num;
        }, 0);
      });

      _.each(answersStats, function(answers, questionId) {
        if (!self.answersPercentage[questionId]) {
          self.answersPercentage[questionId] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
        }

        _.each(answers, function(answer, answerId) {
          self.answersPercentage[questionId][answerId] = answer/answerTotals[questionId];
        });
      });
    },

    parse: function(response){
      response.score = this.calculateScore(response.questions);
      response.result = this.calculateResult(response.score);
      response.questions = this.mergeQuestions(response.questions);
      return response;
    },

    calculateScore: function(answeredQuestions) {
      var correctQuestions = 0;

      _.each(answeredQuestions, function(answeredQuestion) {
        var originalQuestion = _.findWhere(QuestionsData, { id: parseInt(answeredQuestion.id, 10) });
        if (_.isEqual(answeredQuestion.answers, originalQuestion.correctAnswers)) {
          correctQuestions++;
        }
      });

      return correctQuestions / QuestionsData.length * 100;
    },

    calculateResult: function(score) {
      var result;

      if (score >= 80) {
        result = 'The force is strong with this one!';
      }
      else if (score >= 60) {
        result = 'May the force be with you!';
      }
      else {
        result = 'Much to learn you still have, my young padawan!';
      }

      return result;
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
    },

    // Local storage persistence
    sync: function(method, model, options) {
      options || (options = {});

      switch (method){
        case 'read':
          this.read(model, options);
          break;
      }
    },

    read: function(model, options) {
      var key, result;

      key = Common.Repositories.users + model.id;
      result = localStorage.getItem(key);

      if (result) {
        result = JSON.parse(result);
        options.success && options.success(result);
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    }
  });

  return SummaryModel;
});
