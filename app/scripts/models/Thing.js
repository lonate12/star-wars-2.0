var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var Thing = Backbone.Model.extend({
  createDiv: function(){
    var name = this.get('name');

    name.forEach(function(letter) {
      var div = document.createElement('div');

      div.setAttribute('class', 'box');

      if (letter != false) {
        div.setAttribute('class', 'box letter');
        div.setAttribute('data-letter', letter);
      }

      document.getElementById('word-container').appendChild(div);
    });
  },
  getCount: function(callback){
    var url = 'http://swapi.co/api/' + this.get('thing') + '/';
    var self = this;

    $.ajax(url).then(function(response){
      var count = response.count;
      var number = Math.ceil(Math.random() * count);

      self.set('number', number);
      callback();
    });
  },
  multiUrlRequests(urlArray){
    var requestsArray = [];

    if (urlArray) {
      urlArray.forEach(function(url){
        requestsArray.push($.ajax(url));
      });
    }

    return requestsArray;
  }
});

module.exports = {
  Thing: Thing
};
