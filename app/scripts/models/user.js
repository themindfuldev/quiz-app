/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      email: '',
      questions: []
    },

    sync: function(method, model, options){
      options || (options = {});

      var key = "user-" + model.id;
      switch (method){
        case 'create':
          this.create(key, model);
          break;
        case 'read':
          this.read(key, model, options);
          break;
        case 'update':
          this.update(key, model, options);
          break;
        case 'delete':
          this.delete(key, model, options);
          break;
      }
    },

    create: function(key, model) {
      localStorage.setItem(key, JSON.stringify(model));
    },

    read: function(key, model, options) {
      var result = localStorage.getItem(key);
      if (result) {
        result = JSON.parse(result);
        options.success && options.success(result);
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    },

    update: function(key, model, options) {
      var result = localStorage.getItem(key);
      if (result) {
        localStorage.setItem(key, JSON.stringify(model));
        options.success && options.success(model);
      } else if (options.error){
        options.error("Couldn't find id=" + model.id);
      }
    },

    delete: function(key, model, options) {
      var result = localStorage.getItem(key);
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
