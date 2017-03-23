var Thing = require('./Thing.js').Thing;
var $ = require('jquery');

var Planet = Thing.extend({
  defaults: {
    thing: 'planet'
  },
  urlRoot: function(){
    return 'http://swapi.co/api/planets/' + this.get('number') + '/';
  },
  loadHints: function(callback){
    var self = this;

    if (this.get('residents').length !== 0) {
      // console.log('residents is not equal to 0');
      Promise.all(self.multiUrlRequests(self.get('residents'))).then(function(responses){
        var residents = '';
        // console.log(responses);

        if (responses.length === 1) {
          residents += responses[0].name;
          // console.log('There\'s only 1 notable resident.');
        } else {
          // console.log('There\'s ' + responses.length + ' notable residents.');
          responses.forEach(function(response, i){

            if(i === 0){
              residents += response.name;
              return;
            }

            residents += ', ' + response.name;
          });
        }

        self.set('residents', residents);
        // console.log('Planet residents should be loaded.');
        callback();
      });
    }
  },
  hint1: function(){
    return "This planet's climate is: " + this.get('climate');
  },
  hint2: function(){
    return "This planet's terrain is: " + this.get('terrain');
  },
  hint3: function(){
    if (this.get('residents').length !== 0) {
      return "Notable residents include: " + this.get('residents');
    }

    return "This planet has no notable residents.";
  }
});

module.exports = {
  Planet: Planet
};
