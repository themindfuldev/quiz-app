define([
  'underscore',
  'backbone',
  'config/questions-data',
  'repositories/user'
], function (_, Backbone, QuestionsData, UserRepository) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      email: '',
      questions: []
    },

    parse: function(response){
      response.score = this.calculateScore(response.questions);
      response.result = this.calculateResult(response.score);
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

    sync: function(method, model, options) {
      options || (options = {});

      switch (method){
        case 'create':
          UserRepository.create(model);
          break;
        case 'read':
          UserRepository.read(model, options);
          break;
        case 'update':
          UserRepository.update(model, options);
          break;
        case 'delete':
          UserRepository.remove(model, options);
          break;
      }
    },
  });

  return UserModel;
});
