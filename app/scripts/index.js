var Thing = require('./models/Thing.js').Thing;
var Person = require('./models/Person.js').Person;
var Planet = require('./models/Planet.js').Planet;
var $ = require('jquery');

var randomPlanet = new Planet({'planetNumber': 1});

randomPlanet.fetch().then(function(){
  // randomPlanet.loadHints();
  console.log(randomPlanet);
  Promise.all(requests()).then(function(){
    console.log('yep');
  }, function(){
    console.log('nope');
  });
});

$('#button').on('click', function(){
  console.log(randomPlanet.hint1());
  console.log(randomPlanet.hint2());
  console.log(randomPlanet.hint3());
});

function requests(){
  var requestsArray = [];

  randomPlanet.get('residents').forEach(function(url){
    requestsArray.push($.ajax(url));
  });

  return requestsArray;
};
