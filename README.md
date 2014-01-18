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
1. Create a function on this new Module for getting the 10 latest user names, emails and scores in an array of objects like above. Expose it in the Façade.

```javascript
[ 
  { 
    name: 'Han Solo',
    email: 'hsolo@disney.com',
    score: 80
  },
  {
    name: 'Darth Maul',
    email: 'dmaul@disney.com',
    score: 60
  }
]
```
1. Create a view that will show all the 10 latest participants in a sidebar which will always be visible on every page.
1. Create a Mediator
1.
