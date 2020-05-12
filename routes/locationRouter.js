var express = require('express');
var router = express.Router();
var id = require('../Models/locationDAO');

router.get('/', function(req, res, next) {
    id.getPOI(function(result){
      res.send(result);
    });
  });


  router.get('/location', function(req, res, next) {
    id.getLatLong(function(result){
      res.send(result);
    });
  });

  router.get('/img', function(req, res, next) {
    id.getIMG(function(result){
      res.send(result);
    });
  });

  router.get('/comms', function(req, res, next) {
    id.getComms(function(result){
      res.send(result);
    });
  });

  router.get('/ratings', function(req, res, next) {
    id.getRatings(function(result){
      res.send(result);
    });
  });

  router.get('/users', function(req, res, next) {
    id.getUsers(function(result){
      res.send(result);
    });
  });





















  
  module.exports = router;