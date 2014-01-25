define([
  'models/summary',
  'repositories/user',
  'views/summary'
], function (
  SummaryModel,
  UserRepository,
  SummaryView) {

  'use strict';

  var SummaryController = {
    action: function() {
      var userId, summaryModel, summaryView;

      // Retrieving model
      userId = UserRepository.getCurrentUserId();
      if (userId) {
        summaryModel = new SummaryModel({ id: userId });
        summaryModel.fetch();

        summaryView = new SummaryView({
          model: summaryModel
        });
      }

      return summaryView;
    }
  };

  return SummaryController;
});
