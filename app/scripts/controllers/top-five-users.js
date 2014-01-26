define([
  'collections/user',
  'views/top-five-users'
], function (
  UserCollection,
  TopFiveUsersView) {

  'use strict';

  var TopFiveUsersController = {
    action: function() {
      var topFiveUsersCollection, topFiveUsersView;

      topFiveUsersCollection = new UserCollection();
      topFiveUsersCollection.comparator = function(user) {
        return -user.get("score");
      };

      topFiveUsersCollection.fetch();
      if (topFiveUsersCollection.models.length > 5) {
        topFiveUsersCollection.models.length = 5;
      }

      topFiveUsersView = new TopFiveUsersView({
        collection: topFiveUsersCollection
      });
      topFiveUsersView.render();

      return topFiveUsersView;
    }
  };

  return TopFiveUsersController;
});
