/*global define*/

define([
    'jquery',
    'backbone',
    'views/welcome',
    'views/question',
    'views/summary'
], function (
    $,
    Backbone,
    WelcomeView,
    QuestionView,
    SummaryView) {

    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'welcome',
            'question/:id': 'question',
            'summary': 'summary'
        },

        welcome: function() {
            console.log('welcome route');

            var welcomeView = new WelcomeView();
            this.render(welcomeView);
        },

        question: function(id) {
            console.log('question route');

            var questionView = new QuestionView();
            this.render(questionView);
        },

        summary: function() {
            console.log('summary route');

            var summaryView = new SummaryView();
            this.render(summaryView);
        },

        render: function(view) {
            view.render();
            $('#content').html(view.el);
        }

    });

    return AppRouter;
});
