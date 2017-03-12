var React = require('react');

var PlayingField = React.createClass({
  render: function(){
    return(
      <div className="row fs-container">
        <div className="guess-left"></div>
        <div id="word-container"></div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = {
  PlayingField: PlayingField
};
