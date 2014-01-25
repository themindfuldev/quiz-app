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

    sync: UserRepository.sync
  });

  return UserModel;
});
