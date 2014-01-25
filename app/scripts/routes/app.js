define([
  'jquery',
  'backbone',
  'config/common',
  'config/questions-data',
  'models/question',
  'models/user',
  'models/summary',
  'views/welcome',
  'views/question',
  'views/summary'
], function (
  $,
  Backbone,
  Common,
  QuestionsData,
  QuestionModel,
  UserModel,
  SummaryModel,
  WelcomeView,
  QuestionView,
  SummaryView) {

  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'welcome',
      'again': 'again',
      'question-:id': 'question',
      'summary': 'summary'
    },

    welcome: function() {
      var userModel, welcomeView;

      userModel = new UserModel();
      welcomeView = new WelcomeView({
        model: userModel
      });
      this.render(welcomeView);
    },

    again: function() {
      var userId, userModel, welcomeView;

      // Retrieving model
      userId = sessionStorage.getItem(Common.Repositories.currentUserId);
      if (userId) {
        userModel = new SummaryModel({ id: userId });
        userModel.fetch();
      }
      else {
        userModel = new UserModel();
      }

      // Sending it to the view
      welcomeView = new WelcomeView({
        model: userModel
      });
      this.render(welcomeView);
    },

    question: function(id) {
      var questionData, questionModel, questionView;

      id = id || 1;

      questionData = _.findWhere(QuestionsData, { id: parseInt(id, 10) });
      questionModel = new QuestionModel(questionData);
      questionView = new QuestionView({
        model: questionModel
      });
      this.render(questionView);
    },

    summary: function() {
      var userId, summaryModel, summaryView;

      // Retrieving model
      userId = sessionStorage.getItem(Common.Repositories.currentUserId);
      summaryModel = new SummaryModel({ id: userId });
      summaryModel.fetch();

      summaryView = new SummaryView({
        model: summaryModel
      });
      this.render(summaryView);
    },

    render: function(view) {
      if (this.currentView) {
        this.currentView.remove();
      }

      this.currentView = view;
      view.render();
      $('#content').html(view.el);
    }

  });

  return AppRouter;
});
