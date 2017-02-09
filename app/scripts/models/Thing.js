var Backbone = require('backbone');
var _ = require('underscore');

var Thing = Backbone.Model.extend({
  createDiv: function(){
    var name = this.get('name');

    _.each(name, function(letter) {
      var div = document.createElement('div');

      div.setAttribute('class', 'box');

      if (letter != false) {
        div.setAttribute('class', 'box letter');
        div.setAttribute('data-letter', letter);
      }

      document.getElementById('word-container').appendChild(div);
    });
  }
});

module.exports = {
  Thing: Thing
}
