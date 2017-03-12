var React = require('react');
var Planet = require('../models/Planet').Planet;
var $ = require('jquery');

var PlanetsContainer = React.createClass({
  getInitialState: function(){
    var planet = new Planet();

    return{
      planet: planet,
      guessesLeft: 5,
      hintsLeft: 3,
      lettersGuessed: []
    }
  },
  loadData: function(){
    var planet = this.state.planet;
    var self = this;

    planet.fetch().then(function(){
      var nameArray = planet.get('name').split('');

      planet.set('nameArray', nameArray);
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
    var planet = this.state.planet;
    var emptyDivs;

    if(planet.get('nameArray')){
      emptyDivs = planet.get('nameArray').map(function(letter, i){
        return(
          <div className = "box letter" key = {i}></div>
        )
      });
    }

    return(
      <div className="row fs-container">
        <div className="guess-left">
          <h1>Guesses Left: {this.state.guessesLeft}</h1>
        </div>
        <div id="word-container">
          {emptyDivs}
        </div>
        <div>
          <h1>Hints left: {this.state.hintsLeft}</h1>
        </div>
      </div>
    );
  }
});

module.exports = {
  PlanetsContainer: PlanetsContainer
};
