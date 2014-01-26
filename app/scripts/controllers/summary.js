define([
  'models/summary',
  'models/user',
  'repositories/user',
  'views/summary'
], function (
  SummaryModel,
  UserModel,
  UserRepository,
  SummaryView) {

  'use strict';

  var SummaryController = {
    action: function() {
      var userId, userModel, summaryModel, summaryView;

      // Retrieving model
      userId = UserRepository.getCurrentUserId();
      if (userId) {
        userModel = new UserModel({ id: userId });
        userModel.fetch();

        summaryModel = new SummaryModel({ userModel: userModel });

        summaryView = new SummaryView({
          model: summaryModel
        });
      }

      return summaryView;
    }
  };

  return SummaryController;
});
