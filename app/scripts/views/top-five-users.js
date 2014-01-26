define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var TopFiveView = Backbone.View.extend({
    template: JST['app/scripts/templates/top-five-users.hbs'],

    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    },
  });

  return TopFiveView;
});
