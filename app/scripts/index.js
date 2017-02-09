var Thing = require('./models/Thing.js').Thing;
var Person = require('./models/Person.js').Person;
var Planet = require('./models/Planet.js').Planet;
var $ = require('jquery');

var randomPlanet = new Planet({'planetNumber': 4});

randomPlanet.fetch().then(function(){
  randomPlanet.loadHints();
});

$('#button').on('click', function(){
  console.log(randomPlanet.hint1());
  console.log(randomPlanet.hint2());
  console.log(randomPlanet.hint3());
});
