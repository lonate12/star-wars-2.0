var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

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
  },
  setNumber: function(number){
    this.set('number', number);
  },
  multiUrlRequests(urlArray){
    var requestsArray = [];

    urlArray.forEach(function(url){
      requestsArray.push($.ajax(url));
    });

    return requestsArray;
  }
});

module.exports = {
  Thing: Thing
}
