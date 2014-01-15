/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var SummaryView = Backbone.View.extend({
        template: JST['app/scripts/templates/summary.hbs']
    });

    return SummaryView;
});
