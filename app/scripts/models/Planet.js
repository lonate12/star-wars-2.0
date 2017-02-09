var Thing = require('./Thing.js').Thing;
var $ = require('jquery');

var Planet = Thing.extend({
  urlRoot: function(){
    return 'http://swapi.co/api/planets/' + this.get('number') + '/';
  },
  loadHints: function(){
    var self = this;

    if (this.get('residents') != 0) {
      Promise.all(this.multiUrlRequests(self.get('residents'))).then(function(responses){
        var residents = '';

        responses.forEach(function(response, i){
          if (i == 0) {
            residents += response.name;
            return;
          }

          residents += ', ' + response.name;
          self.set('residents', residents);
        });

        console.log(self.get('residents'));
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
      return "Notable residents include: " + this.get('residents');
    }

    return "This planet has no notable residents."
  }
});

module.exports = {
  Planet: Planet
};
