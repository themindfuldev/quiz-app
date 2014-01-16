/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ErrorView = Backbone.View.extend({
    template: JST['app/scripts/templates/error.hbs'],

    render: function() {
      this.$el.html(this.template({ message: this.options.message }));
    },
  });

  return ErrorView;
});
