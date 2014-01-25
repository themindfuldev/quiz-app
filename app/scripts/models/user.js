define([
  'underscore',
  'backbone',
  'repositories/user'
], function (_, Backbone, UserRepository) {
  'use strict';

  var UserModel = Backbone.Model.extend({
    defaults: {
      name: '',
      email: '',
      questions: []
    },

    sync: function(method, model, options) {
      options || (options = {});

      switch (method){
        case 'create':
          UserRepository.create(model);
          break;
        case 'read':
          UserRepository.read(model, options);
          break;
        case 'update':
          UserRepository.update(model, options);
          break;
        case 'delete':
          UserRepository.remove(model, options);
          break;
      }
    },
  });

  return UserModel;
});
