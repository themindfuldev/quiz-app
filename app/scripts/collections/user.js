define([
  'underscore',
  'backbone',
  'models/user',
  'repositories/user'
], function (_, Backbone, UserModel, UserRepository) {
  'use strict';

  var UserCollection = Backbone.Collection.extend({
    model: UserModel,

    sync: function(method, collection, options) {
      options || (options = {});

      switch (method){
        case 'read':
          UserRepository.readAll(collection, options);
          break;
      }
    },
  });

  return UserCollection;
});
