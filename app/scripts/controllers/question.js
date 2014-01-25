define([
  'config/questions-data',
  'models/question',
  'repositories/user',
  'views/question',
], function (
  QuestionsData,
  QuestionModel,
  UserRepository,
  QuestionView) {

  'use strict';

  var QuestionController = {
    action: function(id) {
      var userId, questionData, questionModel, questionView;

      userId = UserRepository.getCurrentUserId();
      if (userId && id) {
        questionData = _.findWhere(QuestionsData, { id: parseInt(id, 10) });
        questionModel = new QuestionModel(questionData);
        questionView = new QuestionView({
          model: questionModel
        });
      }

      return questionView;
    }
  };

  return QuestionController;
});
