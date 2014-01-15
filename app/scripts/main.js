/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    localstorage: {
      deps: ['backbone']
    }
  },
  map: {
    '*': {
      'backbone-local-storage': 'backbone.localStorage'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
    handlebars: '../bower_components/handlebars/handlebars',
    'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage'
  }
});

require([
  'backbone',
  'routes/app'
], function (Backbone, AppRouter) {
  new AppRouter();

  Backbone.history.start({ pushState: true });
});
