var Thing = require('./Thing.js').Thing;
var $ = require('jquery');

var Person = Thing.extend({
  defaults: {
    thing: 'people'
  },
  urlRoot: function(){
    return 'http://swapi.co/api/people/' + this.get('number') + '/';
  },
  loadHints: function(callback){
    var self = this;

    Promise.all([$.ajax(this.get('homeworld')), $.ajax(this.get('species')[0])]).then(function(responses){
      self.set({
        homeworld: responses[0].name,
        species: responses[1].name
      });

      callback();
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
