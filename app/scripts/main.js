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
    }
  },
  map: {
    '*': {
      'boot': 'bootstrap'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
    handlebars: '../bower_components/handlebars/handlebars'
  }
});

require([
  'backbone',
  'config/custom-helpers',
  'config/partials',
  'controllers/top-five-users',
  'routes/app'
], function (Backbone, CustomHelpers, Partials, TopFiveUsersController, AppRouter) {
  var topFiveView;
  // Handlebars setup
  CustomHelpers.initialize();
  Partials.initialize();

  // Sidebar view
  $('#sidebar').html(TopFiveUsersController.action().el);

  // App router
  new AppRouter();
  Backbone.history.start({ pushState: true });
});
