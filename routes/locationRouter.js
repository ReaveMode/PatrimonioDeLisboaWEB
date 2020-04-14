var express = require('express');
var router = express.Router();
var location = require('../Models/locationDAO');

router.get('/', function(req, res, next) {
    location.getPOI(function(result){
      res.send(result);
    });
  });


  router.get('/location', function(req, res, next) {
    location.getLatLong(function(result){
      res.send(result);
    });
  });



























  
  module.exports = router;