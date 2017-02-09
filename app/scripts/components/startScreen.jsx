var React = require('react');

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
      console.log('fired');
    });

    setTimeout(function(){
      document.getElementById('logo').style.width = max;
    });
  },
  render: function(){
    return(
      <div className="row fs-container">
        <img  id="logo" src="./images/star-wars-logo.svg" className="center-block"></img>
        <button className={this.state.loadCompleted ? "start-button center-block" : "hide"}>Click here to begin!!!</button>
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
