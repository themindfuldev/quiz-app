/*global define*/

define([
  'underscore',
  'backbone',
  'common'
], function (_, Backbone, Common) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      email: '',
      questions: []
    },

    // Local storage persistence
    sync: function(method, model, options) {
      options || (options = {});

      switch (method){
        case 'create':
          this.create(model);
          break;
        case 'read':
          this.read(model, options);
          break;
        case 'update':
          this.update(model, options);
          break;
        case 'delete':
          this.delete(model, options);
          break;
      }
    },

    create: function(model) {
      var key;

      model.set('id', parseInt(localStorage.getItem(Common.Repositories.usersSequence) || 0, 10) + 1);
      key = Common.Repositories.users + model.id;

      localStorage.setItem(key, JSON.stringify(model));
      localStorage.setItem(Common.Repositories.usersSequence, model.id);
      sessionStorage.setItem(Common.Repositories.currentUserId, model.id);
    },

    read: function(model, options) {
      var key, result;

      key = Common.Repositories.users + model.id;
      result = localStorage.getItem(key);

      if (result) {
        result = JSON.parse(result);
        options.success && options.success(result);
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    },

    update: function(model, options) {
      var key, result;

      key = Common.Repositories.users + model.id;
      result = localStorage.getItem(key);

      if (result) {
        localStorage.setItem(key, JSON.stringify(model));
        options.success && options.success(model);
      } else if (options && options.error){
        options.error("Couldn't find id=" + model.id);
      }
    },

    delete: function(model, options) {
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
  });

  return UserModel;
});
