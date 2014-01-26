define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var SidebarView = Backbone.View.extend({
    template: JST['app/scripts/templates/sidebar.hbs'],

    events: {
      'click #clear-all': 'clearAll'
    },

    render: function() {
      this.$el.html(this.template(this.collection.toJSON()));
    },

    observers: [],

    notify: function() {
      var args = arguments;
      $.each(this.observers, function(index, observer) {
        observer.callback.apply(observer.context, args);
      });
    },

    addObserver: function(fn) {
      this.observers.push({ context: this, callback: fn });
    },

    clearAll: function(e) {
      this.notify('clear-all-users');
    },

    remove: function() {
      this.observers.length = 0;
      return Backbone.View.prototype.remove.call(this);
    }

  });

  return SidebarView;
});
