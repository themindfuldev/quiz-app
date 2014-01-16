/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'common',
  'models/user'
], function ($, _, Backbone, JST, Common, UserModel) {
  'use strict';

  var WelcomeView = Backbone.View.extend({
    template: JST['app/scripts/templates/welcome.hbs'],

    events: {
      'submit form': 'submit'
    },

    render: function() {
      this.$el.html(this.template());
    },

    submit: function(e) {
      var userModel, errors;

      e.preventDefault();

      // Hiding errors
      this.hideErrors();

      // Building user model
      userModel = this.buildUserModel();

      // Validating
      errors = this.validate(userModel.toJSON());
      if (errors) {
        this.showErrors(errors);
      }
      else {
        // Saving
        userModel.save();
        localStorage.setItem(Common.Repositories.usersSequence, userModel.id);
        sessionStorage.setItem(Common.Repositories.currentUserId, userModel.id);

        // Next route
        Backbone.history.navigate('/question/1', { trigger: true });
      }
    },

    buildUserModel: function() {
      var nextUserId, name, email;

      // Building data
      nextUserId = parseInt(localStorage.getItem(Common.Repositories.usersSequence) || 0, 10) + 1;
      name = this.$el.find('#name-field').val();
      email = this.$el.find('#email-field').val();

      // Creating model
      return new UserModel({
        id: nextUserId,
        name: name,
        email: email
      });
    },

    validate: function (attrs) {
      var errors = [];

      if (!attrs.name) {
        errors.push({name: 'name'});
      }
      if (!attrs.email) {
        errors.push({name: 'email'});
      }

      return errors.length > 0 ? errors : false;
    },

    showErrors: function(errors) {
      var self = this;
      _.each(errors, function (error) {
          var formGroup = self.$el.find('[name=' + error.name + ']').closest('.form-group');
          formGroup.addClass('has-error');
          formGroup.find('.glyphicon').removeClass('hide');
      }, this);
    },

    hideErrors: function () {
      this.$el.find('.form-group').removeClass('has-error');
      this.$el.find('.glyphicon').addClass('hide');
    }

  });

  return WelcomeView;
});
