define([], function () {
  'use strict';

  var UserRepository = (function() {

    var Repositories = {
      usersSequence: 'users-sequence',
      currentUserId: 'current-user-id',
      users: 'users-'
    };

    function persist(storage, key, value) {
      storage.setItem(key, value);
    }

    function retrieve(storage, key) {
      return storage.getItem(key);
    }

    function getNextId() {
      return parseInt(localStorage.getItem(Repositories.usersSequence) || 0, 10) + 1;
    }

    function getKey(id) {
      return Repositories.users + id;
    }

    return {
      create: function(model) {
        model.id = getNextId();

        persist(localStorage, getKey(model.id), JSON.stringify(model));
        persist(localStorage, Repositories.usersSequence, model.id);
        persist(sessionStorage, Repositories.currentUserId, model.id);
      },

      read: function(model, options) {
        var result = retrieve(localStorage, getKey(model.id));

        if (result) {
          result = JSON.parse(result);
          options.success && options.success(result);
        } else if (options.error){
          options.error("Couldn't find id=" + model.id);
        }
      },

      readAll: function(collection, options) {
        var totalUsers, id, user, result;

        totalUsers = this.getTotalUsers();
        result = [];
        for (id = 1; id <= totalUsers; id++) {
          user = retrieve(localStorage, getKey(id));
          if (user) {
            result.push(JSON.parse(user));
          }
        }

        if (result) {
          options.success && options.success(result);
        } else if (options.error){
          options.error("Couldn't find id=" + model.id);
        }
      },

      update: function(model, options) {
        var key, result;

        key = getKey(model.id);
        result = retrieve(localStorage, key);

        if (result) {
          localStorage.setItem(key, JSON.stringify(model));
          options.success && options.success(model);
        } else if (options && options.error){
          options.error("Couldn't find id=" + model.id);
        }
      },

      getCurrentUserId: function() {
        return retrieve(sessionStorage, Repositories.currentUserId);
      },

      getTotalUsers: function() {
        return localStorage.getItem(Repositories.usersSequence);
      },

      getTopFive: function() {

      }
    };

  })();

  return UserRepository;
});
