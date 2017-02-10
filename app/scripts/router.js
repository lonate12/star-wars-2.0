// 3rd party modules
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

// Local modules
var StartScreen = require('./components/startScreen.jsx').StartScreen;
var WelcomeScreen = require('./components/welcomeScreen.jsx').WelcomeScreen;
var SelectScreen = require('./components/selectScreen.jsx').SelectScreen;
var PeopleContainer = require('./components/peopleContainer.jsx').PeopleContainer;
var PlanetsContainer = require('./components/planetsContainer.jsx').PlanetsContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'welcome/': 'welcome',
    'select/': 'select',
    'people/': 'people',
    'planets/': 'planets'
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
  people: function(){
    ReactDOM.render(
      React.createElement(PeopleContainer),
      document.getElementById('app')
    );
  },
  planets: function(){
    ReactDOM.render(
      React.createElement(PlanetsContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
