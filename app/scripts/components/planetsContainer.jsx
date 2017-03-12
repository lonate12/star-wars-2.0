var React = require('react');
var Planet = require('../models/Planet').Planet;
var PlayingField = require('./layout/playingField.jsx').PlayingField;
var $ = require('jquery');

var PlanetsContainer = React.createClass({
  getInitialState: function(){
    var planet = new Planet();

    return{
      planet: planet
    }
  },
  loadData: function(){
    var planet = this.state.planet;
    var self = this;

    planet.fetch().then(function(){
      self.setState({planet: planet});
      planet.loadHints(function(){
        self.setState({planet:planet});
      });
    });
  },
  componentWillMount: function(){
    var self = this;

    this.state.planet.getCount(self.loadData);
  },
  render: function(){
    return(
      <PlayingField>
        <h1>This is a test</h1>
      </PlayingField>
    );
  }
});

module.exports = {
  PlanetsContainer: PlanetsContainer
};
