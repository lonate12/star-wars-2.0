var Thing = require('./Thing.js').Thing;

var Spaceship = Thing.extend({
  urlRoot: function(){
    return 'http://swapi.co/api/spaceships/' + this.get('number') + '/';
  },
  loadHints: function(){},
  hint1: function(){},
  hint2: function(){},
  hint3: function(){}
});

module.exports = {
  Spaceship: Spaceship
};
