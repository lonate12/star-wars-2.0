var React = require('react');

var WinningScreen = React.createClass({
  render: function(){
    return(
      <h1 className="text-center">You win!</h1>
    );
  }
});

module.exports = {
  WinningScreen: WinningScreen
};
