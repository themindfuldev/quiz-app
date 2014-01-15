/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var QuestionView = Backbone.View.extend({
        template: JST['app/scripts/templates/question.hbs']
    });

    return QuestionView;
});
