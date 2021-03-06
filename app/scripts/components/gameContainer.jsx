// 3rd Party Imports
var React = require('react');
var $ = require('jquery');
var Modal = require('react-bootstrap').Modal;


// Local Imports
var Planet = require('../models/Planet').Planet;
var Person = require('../models/Person').Person;
var WinningScreen = require('./display/win.jsx').WinningScreen;
var GuessForm = require('./display/guessForm.jsx').GuessForm;

var GameContainer = React.createClass({
  getInitialState: function(){
    var thing = this.props.thing === "planet" ? new Planet() : new Person();

    return{
      thing: thing,
      guessesLeft: 5,
      hintsLeft: 3,
      lettersGuessed: [],
      guess: '',
      hint1: false,
      hint2: false,
      hint3: false,
      end: false,
      score: 0,
      win: false,
      showModal: false
    }
  },
  open: function(){
    this.setState({showModal: true});
  },
  close: function(){
    this.setState({showModal: false});
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
    var thing = this.state.thing, self = this;

    /* Need to incorporate error messages incase SWAPI API is not reachable.
    Perhaps it would be beneficial to create a word bank to allow play to
    continue in the event that SWAPI is not available. */
    thing.fetch().then(function(){
      var nameArray = thing.get('name').toLowerCase().split('');

      thing.set({
        name: thing.get('name').toLowerCase(),
        nameArray: nameArray,
        winningScore: self.getWinningScore(nameArray)
      });

      console.log(self.state.thing);

      self.setState({thing: thing});
      thing.loadHints(function(){
        self.setState({thing:thing});
      });
    });
  },
  componentWillMount: function(){
    var self = this;

    this.state.thing.getCount(self.loadData);
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
    var guess = this.state.guess,
        nameArray = this.state.thing.get('nameArray'),
        lettersGuessed = this.state.lettersGuessed,
        i = -1,
        self = this;

    if (lettersGuessed.indexOf(guess) === -1) {
      this.state.lettersGuessed.push(guess);

      if (nameArray.indexOf(guess) === -1) {
        // Flash red and "That's incorrect"

        this.state.guessesLeft === 1 ? this.state.end = true : null;
        this.setState({
          guessesLeft: this.state.guessesLeft - 1,
          end: this.state.end
        });
      } else {
        var guessLocations = this.getIndexes(nameArray, guess);
        var test = document.getElementById('word-container').querySelectorAll('h2');

        guessLocations.forEach(function(i){
          self.state.score ++;

          document.getElementById('word-container').querySelectorAll('h2')[i].appendChild(document.createTextNode(self.state.guess));
        });
      }
    } else {
      // Flash You've already guessed this letter
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
    }
  },
  render: function(){
    console.log(this.state.thing.get('name'));
    var thing = this.state.thing,
        emptyDivs,
        lettersUsed = this.state.lettersGuessed.map(function(letter, i){
      return(
        <span className="letters-guessed" key={i}>{letter}</span>
      )
    });

    if(thing.get('nameArray')){
      emptyDivs = thing.get('nameArray').map(function(letter, i){
        if (letter === " " | "-") {
          return(
            <h2 className = "box" key = {i}></h2>
          )
        } else {
          return(
            <h2 className = "box letter" key = {i}></h2>
          )
        }
      });
    }

    return(
      <div className={this.props.thing === 'planet' ? "row fs-container playing-field bg-planet" : "row fs-container playing-field bg-person"}>
        <div className="col-xs-12 clear-fix">
          <div className="guess-left pull-left text-center">
            <h1 className="outline">Guesses Left:</h1>
            <h1 className="count">{this.state.guessesLeft}</h1>
          </div>
          <div className="pull-right text-center">
            <h1 className="outline">Hints left:</h1>
            <h1 className="count">{this.state.hintsLeft}</h1>
            <button className="btn btn-success pull-right" type="button" onClick={this.open}>Show Hints</button>
          </div>
        </div>
        <div id="word-container" className="text-center">
          {emptyDivs}
        </div>
        <div className="text-center">
          {lettersUsed}
        </div>
        <div className={this.state.end ? null : "hide"}>Sorry, you lost. The word was {this.state.thing.get('name') ? this.state.thing.get('name').toLowerCase() : null}</div>
        <GuessForm
          checkGuess = {this.checkGuess}
          end = {this.state.end}
          value = {this.state.guess}
          updateGuess = {this.updateGuess}
        />
        <Modal
          animation={true}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div id="hints">
            <i className="fa fa-times icon" aria-hidden="true" onClick={this.close}></i>
            <h1 className="text-center hint">{this.state.hint1 ? this.state.thing.hint1() : null}</h1>
            <h1 className="text-center hint">{this.state.hint2 ? this.state.thing.hint2() : null}</h1>
            <h1 className="text-center hint">{this.state.hint3 ? this.state.thing.hint3() : null}</h1>
            <button
              className={this.state.hintsLeft > 0 ? "btn btn-success pull-right" : "hide"}
              type="button"
              disabled={this.state.end ? true : false}
              onClick={this.getHint}
            >
              Give me another hint
            </button>
          </div>
        </Modal>
      </div>
    );
  }
});

//
var oldFormStuff = function(){
  return (
    <form onSubmit={this.checkGuess} className={this.state.end ? "hide" : "text-center"} autoComplete="off">
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
  )
};

module.exports = {
  GameContainer: GameContainer
};
