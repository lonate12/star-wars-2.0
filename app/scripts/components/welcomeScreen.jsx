var React = require('react');
var Backbone = require('backbone');

var WelcomeScreen = React.createClass({
  nextScreen: function(){
    var audioTag = document.getElementsByTagName('audio')[0];
    audioTag.addEventListener('ended', namedFunction);

    function namedFunction(){
      Backbone.history.navigate('select/', {trigger: true});
      audioTag.removeEventListener('ended', namedFunction);
    }

    audioTag.play();

  },
  render: function(){
    return(
      <div className="fs-container row">
        <h1 className="text-center welcome">Welcome&hellip;</h1>
        <h2 className="text-center">To my new Star Wars Word Guess Game!</h2>

        <div className="col-xs-12 col-md-6">
          <h2 className="text-center">How to play</h2>
          <ol className="center-block">
            <li>Pick a category</li>
            <li>Guess a letter</li>
            <li>You'll have 5 wrong guesses, keep track of your remaining wrong guesses
              at the top left</li>
            <li>If you need a hint, click the "hint" button</li>
            <li>You'll be able to get up to 3 hints</li>
            <li>If you guess the word within 5 wrong guesses, you win!</li>
          </ol>
        </div>

        <button onClick={this.nextScreen} type="button" className="btn btn-success">Ready, let's do this!</button>
        <audio src="sounds/force2.mp3"></audio>

      </div>
    );
  }
});

module.exports = {
  WelcomeScreen: WelcomeScreen
};
