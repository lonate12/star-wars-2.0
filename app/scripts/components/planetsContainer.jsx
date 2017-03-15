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
      guess: '',
      hint1: false,
      hint2: false,
      hint3: false
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
    var nameArray = this.state.planet.get('nameArray');
    var lettersGuessed = this.state.lettersGuessed;

    if (lettersGuessed.indexOf(guess) === -1) {
      var newArray = this.state.lettersGuessed.push(guess);

      if ( nameArray.indexOf(guess) === -1) {
        console.log('Wrong!');
        this.setState({
          guessesLeft: this.state.guessesLeft - 1
        });
      } else {
        console.log('Yep, it\'s there.');
      }
    } else {
      console.log('You have already guessed this letter.');
    }

    this.setState({guess: ''});
  },
  updateGuess: function(e){
    e.preventDefault();

    this.setState({guess: e.target.value});
  },
  getHint: function(){
    if (this.state.hintsLeft <= 0) {
      console.log('Sorry, no hints left.');
    } else {

      switch (this.state.hintsLeft) {
        case 3:
          this.state.hint1 = true;
          break;
        case 2:
          this.state.hint2 = true;
          break;
        case 1:
          this.state.hint3 = true;
          break;
      }

      this.setState({
        hintsLeft: this.state.hintsLeft - 1
      });
      console.log('hint should now show');
    }
  },
  render: function(){
    console.log(this.state.lettersGuessed);
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
        <div id="hints">
          <div>{this.state.hint1 ? this.state.planet.hint1() : null}</div>
          <div>{this.state.hint2 ? this.state.planet.hint2() : null}</div>
          <div>{this.state.hint3 ? this.state.planet.hint3() : null}</div>
        </div>
        <button type="button" onClick={this.getHint}>Give me a hint</button>
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
