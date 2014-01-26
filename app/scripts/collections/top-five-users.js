define([
  'underscore',
  'backbone',
  'models/user',
  'repositories/user'
], function (_, Backbone, UserModel, UserRepository) {
  'use strict';

  var TopFiveUsersCollection = Backbone.Collection.extend({
    model: UserModel,
    limit: 5,

    sync: function(method, collection, options) {
      options || (options = {});

      switch (method){
        case 'read':
          UserRepository.readAll(collection, options);
          break;
      }
    }

  });

  return TopFiveUsersCollection;
});
