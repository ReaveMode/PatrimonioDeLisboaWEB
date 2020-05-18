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

  router.get('/comms/:ids', function (req, res, next) {
    var ids = req.params.ids
    id.getComms(ids, function (status, result) {
      if (status.code == 200)
        res.send(result);
      else {
        res.statusMessage = status.status;
        res.status(status.code).send({});
      }
    });
  });
    

  router.get('/ratings/:ids', function (req, res, next) {
    var ids = req.params.ids
    id.getRatings(ids, function (status, result) {
      if (status.code == 200)
        res.send(result);
      else {
        res.statusMessage = status.status;
        res.status(status.code).send({});
      }
    });
  });

  router.post('/rating', function (req, res, next) {
    id.postRating(req.body, function (status, result) {
      if (status.code == 200)
        res.send(result);
      else {
        res.statusMessage = status.status;
        res.status(status.code).send({});
      }
    });
  });

  router.post('/comentario', function (req, res, next) {
    id.postComment(req.body, function (status, result) {
      if (status.code == 200)
        res.send(result);
      else {
        res.statusMessage = status.status;
        res.status(status.code).send({});
      }
    });
  });
    
  router.get('/AvgRating', function(req, res, next) {
    id.getAvg(function(result, status){
        res.send(result);
    });
  });
  

  router.get('/allRatings', function(req, res, next) {
    id.getAllRatings(function(result, status){
        res.send(result);
    });
  });
  router.get('/allComments', function(req, res, next) {
    id.getAllComments(function(result, status){
        res.send(result);
    });
  });
  
 
  
















  
  module.exports = router;