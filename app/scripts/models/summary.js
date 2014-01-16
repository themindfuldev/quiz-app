/*global define*/

define([
  'underscore',
  'backbone',
  'common',
  'questions-data'
], function (_, Backbone, Common, QuestionsData) {
  'use strict';

  var SummaryModel = Backbone.Model.extend({
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

      return (correctQuestions / QuestionsData.length) * 100;
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
      var questions = [];

      _.each(answeredQuestions, function(answeredQuestion) {
        var question, originalQuestion, userAnswers;

        originalQuestion = _.findWhere(QuestionsData, { id: parseInt(answeredQuestion.id, 10) });
        question = {
          id: originalQuestion.id,
          question: originalQuestion.question,
          answers: []
        };

        _.each(originalQuestion.answers, function(originalAnswer, index) {
          var result;

          if (_.contains(originalQuestion.correctAnswers, index)) {
            result = 'correct';
          }
          else {
            result = 'incorrect';
          }

          if (_.contains(answeredQuestion.answers, index)) {
            result += ' answered';
          }

          question.answers.push({
            answer: originalAnswer,
            result: result
          });
        });

        questions.push(question);
      });

      return questions;
    },

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
