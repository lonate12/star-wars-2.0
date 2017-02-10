var React = require('react');

var SelectScreen = React.createClass({
  render: function(){
    return (
      <div className="row fs-container">
        <div className="col-md-6" data-select="people">
          <img className="people select-img" src="images/han-solo.jpg"></img>
        </div>
        <div className="col-md-6 planets" data-select="planets">
          <img className="planets select-img" src="images/planet.png"></img>
        </div>
      </div>
    );
  }
});

module.exports = {
  SelectScreen: SelectScreen
};
