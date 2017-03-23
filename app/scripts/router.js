// 3rd party modules
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local modules
var StartScreen = require('./components/startScreen.jsx').StartScreen;
var WelcomeScreen = require('./components/welcomeScreen.jsx').WelcomeScreen;
var SelectScreen = require('./components/selectScreen.jsx').SelectScreen;
var GameContainer = require('./components/gameContainer.jsx').GameContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'welcome/': 'welcome',
    'select/': 'select',
    'play/:thing': 'play'
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
  },
  select: function(){
    ReactDOM.render(
      React.createElement(SelectScreen),
      document.getElementById('app')
    );
  },
  play: function(thing){
    ReactDOM.render(
      React.createElement(GameContainer, {thing: thing}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
