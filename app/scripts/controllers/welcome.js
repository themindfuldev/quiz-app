define([
  'models/user',
  'views/welcome'
], function (
  UserModel,
  WelcomeView) {

  'use strict';

  var WelcomeController = {
    action: function() {
      var userModel, welcomeView;

      userModel = new UserModel();

      welcomeView = new WelcomeView({
        model: userModel
      });

      return welcomeView;
    }
  };

  return WelcomeController;
});
