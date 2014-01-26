define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/user'
], function ($, _, Backbone, JST, UserModel) {
  'use strict';

  var WelcomeView = Backbone.View.extend({
    template: JST['app/scripts/templates/welcome.hbs'],

    events: {
      'submit form': 'submit',
      'click [data-route]': 'route'
    },

    render: function() {
     this.$el.html(this.template(this.model.toJSON()));
    },

    submit: function(e) {
      var userModel;

      e.preventDefault();

      userModel = this.buildUserModel();
      userModel.save();
      Backbone.history.navigate('/question-1', { trigger: true });
    },

    buildUserModel: function() {
      return new UserModel({
        name: this.$el.find('#name-field').val(),
        email: this.$el.find('#email-field').val()
      });
    },

    route: function(e) {
      e.preventDefault();
      Backbone.history.navigate($(e.currentTarget).attr('data-route'), { trigger: true });
    }

  });

  return WelcomeView;
});
