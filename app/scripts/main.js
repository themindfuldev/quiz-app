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
  'controllers/sidebar',
  'routers/content'
], function (Backbone, CustomHelpers, Partials, SidebarController, ContentRouter) {
  // Handlebars setup
  CustomHelpers.initialize();
  Partials.initialize();

  // Sidebar view
  SidebarController.initialize();

  // Content router
  new ContentRouter();
  Backbone.history.start({ pushState: true });
});
