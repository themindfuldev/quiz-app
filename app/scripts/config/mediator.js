define([], function () {
  'use strict';

  var Mediator = {
    channels: {},
    subscribe: function(channel, fn) {
      if (!Mediator.channels[channel]) Mediator.channels[channel] = [];
      Mediator.channels[channel].push({ context: this, callback: fn });
    },
    publish: function(channel) {
      if (!Mediator.channels[channel]) return;
      var args = Array.prototype.slice.call(arguments, 1);
      $.each(Mediator.channels[channel], function(index, subscriber) {
        subscriber.callback.apply(subscriber.context, args);
      });
    },
    installTo: function(publisher) {
      publisher.subscribe = Mediator.subscribe;
      publisher.publish = Mediator.publish;
    }
  };

  return Mediator;
});