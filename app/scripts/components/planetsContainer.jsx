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
      lettersGuessed: [],
      guess: ''
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
  checkGuess: function(e){
    e.preventDefault();
    var guess = this.state.guess;

    if ( this.state.lettersGuessed.indexOf(guess) === -1) {
      console.log('You haven\'t guessed this letter yet.');
      this.state.lettersGuessed.push(guess);
      console.log('Your guess has now been added.');
    } else {
      console.log('You\'ve already guessed this letter.');
    }

    this.setState({guess: ''});
  },
  updateGuess: function(e){
    e.preventDefault();

    this.setState({guess: e.target.value});
  },
  render: function(){
    var planet = this.state.planet;
    var emptyDivs;
    var lettersUsed = this.state.lettersGuessed.map(function(letter, i){
      return(
        <span key={i}>{letter}</span>
      )
    });

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
        <div>
          {lettersUsed}
        </div>
        <form onSubmit={this.checkGuess}>
          <label htmlFor="guess">Enter Guess</label>
          <input
            type="text"
            id="guess"
            autoFocus="true"
            name="guess"
            onChange={this.updateGuess}
            value={this.state.guess}
            maxLength="1"
          ></input>
          <button type="submit">Submit guess</button>
        </form>
      </div>
    );
  }
});

module.exports = {
  PlanetsContainer: PlanetsContainer
};
