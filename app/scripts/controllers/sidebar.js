define([
  'collections/user',
  'config/mediator',
  'views/top-five-users'
], function (
  UserCollection,
  Mediator,
  TopFiveUsersView) {

  'use strict';

  var SidebarController = (function() {
    var topFiveUsersView;

    return {
      initialize: function() {
        this.action();
        Mediator.subscribe('user-update', this.action);
      },

      action: function() {
        var topFiveUsersCollection = new UserCollection();
        topFiveUsersCollection.comparator = function(user) {
          return -user.get("score");
        };

        topFiveUsersCollection.fetch();
        if (topFiveUsersCollection.models.length > 5) {
          topFiveUsersCollection.models.length = 5;
        }

        // View
        if (topFiveUsersView) topFiveUsersView.remove();

        topFiveUsersView = new TopFiveUsersView({
          collection: topFiveUsersCollection
        });
        topFiveUsersView.render();

        $('#sidebar').html(topFiveUsersView.el);
      }
    }
  })();

  return SidebarController;
});
