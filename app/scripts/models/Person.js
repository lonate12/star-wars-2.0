var Thing = require('./Thing.js').Thing;
var $ = require('jquery');

var Person = Thing.extend({
  urlRoot: function(){
    return 'http://swapi.co/api/people/' + this.get('personNumber') + '/';
  },
  loadHints: function(){
    var self = this;

    $.ajax(this.get('homeworld')).then(function(response){
      self.set('homeworld', response.name);
    });

    $.ajax(this.get('species')[0]).then(function(response){
      self.set('species', response.name);
    });
  },
  hint1: function(){
    return "This character's gender is: " + this.get('gender');
  },
  hint2: function(){
    return "This character's homeworld is: " + this.get('homeworld');
  },
  hint3: function(){
    return "This character's species is: " + this.get('species');
  },
});

module.exports = {
  Person: Person
};
