var React = require('react');
var Backbone = require('backbone');

var StartScreen = React.createClass({
  getInitialState: function(){
    return{
      loadCompleted: false
    }
  },
  zoomIn: function(){
    var max = (screen.width * .6) + 'px';
    var self = this;

    document.getElementById('logo').addEventListener("transitionend", function(){
      self.setState({loadCompleted: true});
      document.getElementsByTagName('audio')[0].play();
    });

    setTimeout(function(){
      document.getElementById('logo').style.width = max;
    });
  },
  nextScreen: function(){
    console.log('fired next screen button');
    Backbone.history.navigate('welcome/', {trigger: true});
  },
  render: function(){
    return(
      <div className="row fs-container">
        <img  id="logo" src="./images/star-wars-logo.svg" className="center-block"></img>
        <button onClick={this.nextScreen} className={this.state.loadCompleted ? "start-button center-block" : "hide"}>Click here to begin!!!</button>
        <audio src="sounds/star-wars-theme-song.mp3"></audio>
      </div>
    );
  },
  componentDidMount: function(){
    this.zoomIn();
  }
});

module.exports = {
  StartScreen: StartScreen
};
