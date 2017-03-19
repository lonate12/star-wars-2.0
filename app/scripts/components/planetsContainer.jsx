// 3rd Party Imports
var React = require('react');
var Planet = require('../models/Planet').Planet;
var $ = require('jquery');

// Local Imports
var WinningScreen = require('./display/win.jsx').WinningScreen;

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
      hint3: false,
      end: false,
      score: 0,
      win: false
    }
  },
  getWinningScore: function(arr){
    var winningScore = 0;

    arr.forEach(function(letter){
      if (letter === " " | "-") {
        return;
      } else {
        winningScore += 1;
      }
    });

    return winningScore;
  },
  loadData: function(){
    var planet = this.state.planet;
    var self = this;

    planet.fetch().then(function(){
      var nameArray = planet.get('name').toLowerCase().split('');

      planet.set({
        name: planet.get('name').toLowerCase(),
        nameArray: nameArray,
        winningScore: self.getWinningScore(nameArray)
      });

      console.log(self.state.planet);

      // planet.set('nameArray', nameArray);
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
  getIndexes: function(arr, val){
    var indexes = [], i=-1;

    while((i=arr.indexOf(val, i+1)) !== -1) {
      indexes.push(i);
    }

    return indexes;
  },
  checkGuess: function(e){
    e.preventDefault();
    var guess = this.state.guess;
    var nameArray = this.state.planet.get('nameArray');
    var lettersGuessed = this.state.lettersGuessed;
    var i = -1;
    var self = this;

    if (lettersGuessed.indexOf(guess) === -1) {
      this.state.lettersGuessed.push(guess);

      if (nameArray.indexOf(guess) === -1) {
        console.log('Wrong!');

        this.state.guessesLeft === 1 ? this.state.end = true : null;
        this.setState({
          guessesLeft: this.state.guessesLeft - 1,
          end: this.state.end
        });
      } else {
        var guessLocations = this.getIndexes(nameArray, guess);
        var test = document.getElementById('word-container').querySelectorAll('div');

        guessLocations.forEach(function(i){
          self.state.score ++;
          document.getElementById('word-container').querySelectorAll('div')[i].innerHTML = self.state.guess.toUpperCase();
        });
        console.log('Yep, it\'s there.');
      }
    } else {
      console.log('You have already guessed this letter.');
    }

    this.setState({guess: ''});
  },
  updateGuess: function(e){
    e.preventDefault();
    var lowerCaseInput = e.target.value.toLowerCase();

    this.setState({guess: lowerCaseInput});
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
    console.log(this.state.planet.get('name'));
    console.warn(this.state.score);
    var planet = this.state.planet;
    var emptyDivs;
    var lettersUsed = this.state.lettersGuessed.map(function(letter, i){
      return(
        <span className="letters-guessed" key={i}>{letter}</span>
      )
    });

    if(planet.get('nameArray')){
      emptyDivs = planet.get('nameArray').map(function(letter, i){
        if (letter === " " | "-") {
          return(
            <div className = "box" key = {i}></div>
          )
        } else {
          return(
            <div className = "box letter" key = {i}></div>
          )
        }
      });
    }

    return(
      <div className="row fs-container">
        <div className="col-md-12 clear-fix">
          <div className="guess-left pull-left">
            <h1>Guesses Left: {this.state.guessesLeft}</h1>
          </div>
          <div className="pull-right">
            <h1>Hints left: {this.state.hintsLeft}</h1>
          </div>
        </div>
        <div id="word-container" className="text-center">
          {emptyDivs}
        </div>
        <div className="text-center">
          {lettersUsed}
        </div>
        <div id="hints">
          <div>{this.state.hint1 ? this.state.planet.hint1() : null}</div>
          <div>{this.state.hint2 ? this.state.planet.hint2() : null}</div>
          <div>{this.state.hint3 ? this.state.planet.hint3() : null}</div>
        </div>
        <div className={this.state.end ? null : "hide"}>Sorry, you lost. The word was {this.state.planet.get('name') ? this.state.planet.get('name').toUpperCase() : null}</div>
        <button
          className={this.state.hintsLeft > 0 ? "btn btn-success pull-right" : "hide"}
          type="button"
          disabled={this.state.end ? true : false}
          onClick={this.getHint}
        >
          Give me a hint
        </button>
        <form onSubmit={this.checkGuess} className={this.state.end ? "hide" : "text-center"}>
          <div className="form-group width-letter-size text-center">
            <label htmlFor="guess" className="hidden">Enter Guess</label>
            <input
              className="form-control"
              type="text"
              id="guess"
              autoFocus="true"
              name="guess"
              onChange={this.updateGuess}
              value={this.state.guess}
              maxLength="1"
            ></input>
          </div>
        <button type="submit" className="btn btn-success">Submit guess</button>
        </form>
      </div>
    );
  }
});

module.exports = {
  PlanetsContainer: PlanetsContainer
};
