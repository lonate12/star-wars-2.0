var React = require('react');

var GuessForm = React.createClass({
  passGuess: function(e){
    e.preventDefault();

    this.props.updateGuess(e);
  },
  render: function(){
    return(
      <form onSubmit={this.props.checkGuess} className={this.props.end ? "hide" : "text-center"} autoComplete="off">
        <div className="form-group width-letter-size text-center">
          <label htmlFor="guess" className="hidden">Enter Guess</label>
          <input
            className="form-control"
            type="text"
            id="guess"
            autoFocus="true"
            name="guess"
            onChange={this.passGuess}
            value={this.props.guess}
            maxLength="1"
          ></input>
        </div>
      <button type="submit" className="btn btn-success">Submit guess</button>
      </form>
    )
  }
});

module.exports = {
  GuessForm: GuessForm
};
