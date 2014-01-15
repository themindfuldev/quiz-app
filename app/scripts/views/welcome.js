/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var WelcomeView = Backbone.View.extend({
        template: JST['app/scripts/templates/welcome.hbs']
    });

    return WelcomeView;
});
