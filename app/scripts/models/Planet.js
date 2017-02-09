var Thing = require('./Thing.js').Thing;

var Planet = Thing.extend({
  urlRoot: function(){
    return 'http://swapi.co/api/planets/' + this.get('planetNumber') + '/';
  },
  loadHints: function(){
    var self = this;

    if (this.get('residents') != 0) {
      $.ajax(this.get('residents')[0]).then(function(response){
        self.set('residents', response.name);
      });
    }
    return null;
  },
  hint1: function(){
    return "This planet's climate is: " + this.get('climate');
  },
  hint2: function(){
    return "This planet's terrain is: " + this.get('terrain');
  },
  hint3: function(){
    if (this.get('residents') != 0) {
      return "A notable resident from this planet is: " + this.get('residents');
    }

    return "This planet has no notable residents."
  }
});

module.exports = {
  Planet: Planet
};
