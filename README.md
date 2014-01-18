Quiz app
========

Challenge application for UI Bootcamp at Avenue Code, exercising Backbone.js and RequireJS.

Run
===

1. npm install
1. grunt build
1. grunt server (development mode) 
1. grunt server:dist (production mode)

Refactor to Design Patterns for Large-Scale JS
======================================================

1. Fork this repo into your own GitHub account.
1. Notice how the User and Summary models repeat the CRUD logic persistence using local storage. Refactor that by creating a common Module + Façade to be reused on both models, name it UserDAO or UserRepository. 
1. Create a function on this new Module for getting the **Score Top Five**, showing their user names, emails and scores in an array of objects like above. Expose it in the Façade.

    ```javascript
    [ 
      { 
        name: 'Yoda',
        email: 'yoda@disney.com',
        score: 100
      },
      {
        name: 'Darth Maul',
        email: 'dmaul@disney.com',
        score: 60
      },
      {
        name: 'Palpatine',
        email: 'palpatine@disney.com',
        score: 40
      },
      {
        name: 'Han Solo',
        email: 'hsolo@disney.com',
        score: 40
      },
      {
        name: 'Jabba The Hut',
        email: 'jhut@disney.com',
        score: 20
      }
    ]
    ```
1. Create a Sidebar view that will show all the Score Top Five (name, email and score) in a sidebar which will always be visible on every page.
1. Create a Mediator (a.k.a. Pub/Sub) to control the communication flow for the following scenario:
  1. Every time a user is created or updated, this Sidebar view must be updated
  1. The Sidebar view and the views that manipulate user creation/update must not know about each other
  1. Which means you should have the Mediator to re-render the Sidebar view after a create/update to be reported by the UserDAO / UserRepository. You need to setup some event, listener and publisher to make that happen.
  1. Remember the way the Mediator works, the Module MUST NOT contain any reference to the Mediator. It should be the other way around using events.
1. Create an Observer (a.k.a. Custom Event) to control the communication flow for the following scenario:
  1. Create a 'clearAll' function on the UserDAO / UserRepository module to delete all the users and the user-sequence.
  1. Create a 'clear all' button on this sidebar to call this module.
  1. This button should invoke the Module's function via events. You need to setup some event, listener and publisher to make that happen.
  1. Differently from the Mediator, the Observer CAN fire events on the Observed methods directly.
1. Send me your solution in a GitHub repo.
