var React = require('react');
var Backbone = require('backbone');

var SelectScreen = React.createClass({
  selectThis: function(e){
    var selection = e.target.getAttribute('data-select');
    Backbone.history.navigate('play/' + selection, {trigger: true});
  },
  render: function(){
    return (
      <div className="row fs-container">
        <div className="col-md-6">
          <div onClick={this.selectThis} className="col-md-12 people select-div" data-select="people">
            <h1 className="select-text" data-select="person">Characters</h1>
          </div>
        </div>
        <div className="col-md-6">
          <div onClick={this.selectThis} className="col-md-12 planets select-div" data-select="planets">
            <h1 className="select-text" data-select="planet">Planets</h1>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  SelectScreen: SelectScreen
};
