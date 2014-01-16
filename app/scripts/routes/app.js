/*global define*/

define([
  'jquery',
  'backbone',
  'common',
  'models/question',
  'models/user',
  'views/welcome',
  'views/question',
  'views/summary'
], function (
  $,
  Backbone,
  Common,
  QuestionModel,
  UserModel,
  WelcomeView,
  QuestionView,
  SummaryView) {

  'use strict';

  var questionsData = [
    {
      id: 1,
      question: 'Who first built C3P0?',
      answers: [
        'Obi-Wan Kenobi',
        'Luke Skywalker',
        'Qui-Gon Jinn',
        'Anakin Skywalker',
        'Jabba The Hut'
      ],
      correctAnswers: [ 3 ]
    },
    {
      id: 2,
      question: 'What is the race of Chewbacca?',
      answers: [
        'Oki-dokie',
        'Dookie',
        'Wooku',
        'Dooku',
        'Wookie'
      ],
      correctAnswers: [ 4 ]
    },
    {
      id: 3,
      question: 'How many suns and moons are there in Tatooine?',
      answers: [
        '2 suns and no moon',
        '2 suns and 1 moon',
        '2 suns and 2 moon',
        '2 suns and 3 moons',
        '3 suns and 2 moons'
      ],
      correctAnswers: [ 3 ]
    },
    {
      id: 4,
      question: 'Which ones below are Jedi masters?',
      answers: [
        'Anakin Skywalker',
        'Mace Windu',
        'Qui-Gon Jinn',
        'Lando Calrissian',
        'Yoda'
      ],
      correctAnswers: [ 1, 2, 4 ]
    },
    {
      id: 5,
      question: 'Which creatures inhabit the forest moon of Endor?',
      answers: [
        'Woks',
        'Ewoks',
        'Hewoks',
        'Wookies',
        'Dookies'
      ],
      correctAnswers: [ 1 ],
      lastQuestion: true
    }
  ];

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'welcome',
      'question/:id': 'question',
      'summary': 'summary'
    },

    welcome: function() {
      var welcomeView = new WelcomeView();
      this.render(welcomeView);
    },

    question: function(id) {
      var questionData, questionModel, questionView;

      questionData = _.findWhere(questionsData, { id: parseInt(id, 10) });
      questionModel = new QuestionModel(questionData);
      questionView = new QuestionView({
        model: questionModel
      });
      this.render(questionView);
    },

    summary: function() {
      var userId, userModel, summaryView;

      // Retrieving model
      userId = sessionStorage.getItem(Common.Repositories.currentUserId);
      userModel = new UserModel(userId);
      userModel.fetch();

      summaryView = new SummaryView({
        model: userModel
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
