define([
  'config/common'
], function (Common) {
  'use strict';

  var UserRepository = (function() {

    function create(model) {
      var key;

      model.set('id', parseInt(localStorage.getItem(Common.Repositories.usersSequence) || 0, 10) + 1);
      key = Common.Repositories.users + model.id;

      localStorage.setItem(key, JSON.stringify(model));
      localStorage.setItem(Common.Repositories.usersSequence, model.id);
      sessionStorage.setItem(Common.Repositories.currentUserId, model.id);
    }

    function read(model, options) {
      var key, result;

      key = Common.Repositories.users + model.id;
      result = localStorage.getItem(key);

      if (result) {
        result = JSON.parse(result);
        options.success && options.success(result);
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    }

    function update(model, options) {
      var key, result;

      key = Common.Repositories.users + model.id;
      result = localStorage.getItem(key);

      if (result) {
        localStorage.setItem(key, JSON.stringify(model));
        options.success && options.success(model);
      } else if (options && options.error){
        options.error("Couldn't find id=" + model.id);
      }
    }

    function remove(model, options) {
      var key, result;

      key = Common.Repositories.usersSequence + model.id;
      result = localStorage.getItem(key);

      if (result) {
        localStorage.removeItem(key);
        options.success && options.success();
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    }

    return {
      sync: function(method, model, options) {
        options || (options = {});

        switch (method){
          case 'create':
            create(model);
            break;
          case 'read':
            read(model, options);
            break;
          case 'update':
            update(model, options);
            break;
          case 'delete':
            remove(model, options);
            break;
        }
      },

      getTotalUsers: function() {
        return localStorage.getItem(Common.Repositories.usersSequence);
      }
    };

  })();

  return UserRepository;
});
