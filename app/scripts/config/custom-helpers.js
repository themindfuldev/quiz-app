define([
  'handlebars',
], function (Handlebars) {
  'use strict';

  var CustomHelpers = {
    initialize: function() {
      Handlebars.registerHelper("formatPercentage", function(number) {
        return (number % 1 === 0)? number: parseFloat(number).toFixed(2);
      });
    }
  };

  return CustomHelpers;
});
