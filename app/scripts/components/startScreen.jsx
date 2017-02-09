var React = require('react');

var StartScreen = React.createClass({
  render: function(){
    return(
      <div className="row fs-container">
        <img src="./images/star-wars-logo.svg"></img>
      </div>
    );
  }
});

module.exports = {
  StartScreen: StartScreen
};
