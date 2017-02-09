var Thing = require('./Thing.js').Thing;

var Vehicle = Thing.extend({
  urlRoot: function(){
    return 'http://swapi.co/api/vehicles/' + this.get('number') + '/';
  },
  loadHints: function(){},
  hint1: function(){},
  hint2: function(){},
  hint3: function(){}
});

module.exports = {
  Vehicle: Vehicle
};
