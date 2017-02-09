// 3rd party modules
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local modules
var StartScreen = require('./components/startScreen.jsx').StartScreen;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },
  index: function(){
    ReactDOM.render(
      React.createElement(StartScreen),
      document.getElementById('app')
    );
  },
});

var router = new AppRouter();

module.exports = router;
