/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var QuestionModel = Backbone.Model.extend({
    defaults: {
    }
  });

  return QuestionModel;
});
