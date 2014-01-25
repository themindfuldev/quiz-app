define([
  'handlebars',
  'templates'
], function (Handlebars, JST) {
  'use strict';

  var Partials = {
    templateNew: JST['app/scripts/templates/welcome-new.hbs'],
    templateAgain: JST['app/scripts/templates/welcome-again.hbs'],

    initialize: function() {
      Handlebars.registerPartial("welcome-new", this.templateNew);
      Handlebars.registerPartial("welcome-again", this.templateAgain);
    }
  };

  return Partials;
});
