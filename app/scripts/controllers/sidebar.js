define([
  'collections/user',
  'config/mediator',
  'views/sidebar'
], function (
  UserCollection,
  Mediator,
  SidebarView) {

  'use strict';

  var SidebarController = (function() {
    var sidebarView;

    return {
      initialize: function() {
        this.action();
        Mediator.subscribe('user-update', this.action);
      },

      action: function() {
        var topFiveUsersCollection, self;

        topFiveUsersCollection = new UserCollection();
        topFiveUsersCollection.comparator = function(user) {
          return -user.get("score");
        };

        topFiveUsersCollection.fetch();
        if (topFiveUsersCollection.models.length > 5) {
          topFiveUsersCollection.models.length = 5;
        }

        // View
        if (sidebarView) sidebarView.remove();

        sidebarView = new SidebarView({
          collection: topFiveUsersCollection
        });
        sidebarView.render();

        self = this;
        sidebarView.addObserver(function(event) {
          if (event === 'clear-all-users') {
            topFiveUsersCollection.clearAll();
            self.publish('user-update', {});
            Backbone.history.navigate('', { trigger:true });
          }
        });

        $('#sidebar').html(sidebarView.el);
      }
    }
  })();

  return SidebarController;
});
