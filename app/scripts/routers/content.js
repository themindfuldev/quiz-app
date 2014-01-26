define([
  'jquery',
  'backbone',
  'controllers/welcome',
  'controllers/again',
  'controllers/question',
  'controllers/summary'
], function (
  $,
  Backbone,
  WelcomeController,
  AgainController,
  QuestionController,
  SummaryController) {

  'use strict';

  var ContentRouter = Backbone.Router.extend({
    routes: {
      '': 'welcome',
      'again': 'again',
      'question-:id': 'question',
      'summary': 'summary'
    },

    welcome: function() {
      this.render(WelcomeController.action());
    },

    again: function() {
      this.render(AgainController.action());
    },

    question: function(id) {
      this.render(QuestionController.action(id));
    },

    summary: function() {
      this.render(SummaryController.action());
    },

    render: function(view) {
      if (this.currentView) {
        this.currentView.remove();
      }

      if (view) {
        this.currentView = view;
        view.render();
        $('#content').html(view.el);
      }
      else {
        this.navigate('', { trigger:true });
      }
    }

  });

  return ContentRouter;
});
