define([
  'models/user',
  'repositories/user',
  'views/welcome'
], function (
  UserModel,
  UserRepository,
  WelcomeView) {

  'use strict';

  var AgainController = {
    action: function() {
      var userId, userModel, welcomeView;

      // Retrieving model
      userId = UserRepository.getCurrentUserId();
      if (userId) {
        userModel = new UserModel({ id: userId });
        userModel.fetch();
      }
      else {
        userModel = new UserModel();
      }

      // Sending it to the view
      welcomeView = new WelcomeView({
        model: userModel
      });

      return welcomeView;
    }
  };

  return AgainController;
});
