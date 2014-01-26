define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SummaryView = Backbone.View.extend({
    template: JST['app/scripts/templates/summary.hbs'],

    events: {
      'click [data-route]': 'route'
    },

    render: function() {
     this.$el.html(this.template(this.model.toJSON()));
    },

    route: function(e) {
      e.preventDefault();
      Backbone.history.navigate($(e.currentTarget).attr('data-route'), { trigger: true });
    }
  });

  return SummaryView;
});
