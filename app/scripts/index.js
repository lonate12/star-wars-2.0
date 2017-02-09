var Backbone = require('backbone');
var $ = require('jquery');

require('./router.js');

$(function(){
  Backbone.history.start();
})
