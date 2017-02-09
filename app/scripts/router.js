// 3rd party modules
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local modules
var StartScreen = require('./components/startScreen.jsx').StartScreen;
var WelcomeScreen = require('./components/welcomeScreen.jsx').WelcomeScreen;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'welcome/': 'welcome'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(StartScreen),
      document.getElementById('app')
    );
  },
  welcome: function(){
    ReactDOM.render(
      React.createElement(WelcomeScreen),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
