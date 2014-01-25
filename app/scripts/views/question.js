define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/user',
  'repositories/user',
  'views/error',
  'boot'
], function ($, _, Backbone, JST, UserModel, UserRepository, ErrorView) {
  'use strict';

  var QuestionView = Backbone.View.extend({
    template: JST['app/scripts/templates/question.hbs'],

    events: {
      'submit form': 'submit'
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    submit: function(e) {
      var answers, isValid, userModel, nextRoute;

      e.preventDefault();

      // Hiding errors
      this.hideErrors();

      // Building answers
      answers = this.buildAnswers();

      // Validating
      isValid = this.validate(answers);
      if (!isValid) {
        this.showErrors();
      }
      else {
        // Saving user model
        userModel = this.updateUserModel(answers);
        userModel.save();

        // Next route
        if (this.model.get('lastQuestion')) {
          nextRoute = '/summary';
        }
        else {
          nextRoute = '/question-' + (this.model.id + 1);
        }
        Backbone.history.navigate(nextRoute, { trigger: true });
      }
    },

    buildAnswers: function() {
      var answers;

      // Building data
      answers = $.map(this.$el.find('input:checked'), function(element) {
        return parseInt(element.value);
      });

      return answers;
    },

    updateUserModel: function(answers) {
      var userId, userModel;

      // Retrieving model
      userId = UserRepository.getCurrentUserId();
      userModel = new UserModel({ id: userId });
      userModel.fetch();

      // Updating model
      userModel.get('questions').push({
        id: this.model.id,
        answers: answers
      });

      return userModel;
    },

    validate: function (attrs) {
      return attrs.length >= 1 && attrs.length <= 3;
    },

    showErrors: function() {
      var errorView = new ErrorView({
        message: 'You must select between 1 and 3 answers'
      });
      errorView.render();
      this.$el.find('.error-container').html(errorView.el);

      this.$el.find('.form-group').addClass('has-error');
    },

    hideErrors: function () {
      this.$el.find('.form-group').removeClass('has-error');
      this.$el.find('.alert').alert('close');
    }

  });

  return QuestionView;
});
