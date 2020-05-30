var express = require('express');
var router = express.Router();
var id = require('../Models/locationDAO');

/*Gets all the data from a POI */
router.get('/', function(req, res, next) {
    id.getPOI(function(result){
      res.send(result);
    });
  });

/*Does the same as the above */
  router.get('/location', function(req, res, next) {
    id.getLatLong(function(result){
      res.send(result);
    });
  });
/* Gets the id of the POI and the img */
  router.get('/img', function(req, res, next) {
    id.getIMG(function(result){
      res.send(result);
    });
  });

/*Gets the comments by POI ID */
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
    
/* Gets the rating by POI ID */
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

  /* Posts a rating */
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
 /* Posts a comment */
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
   /* Gets the average rating from each POI */
  router.get('/AvgRating', function(req, res, next) {
    id.getAvg(function(result, status){
        res.send(result);
    });
  });
  
 /* Gets all the ratings */
  router.get('/allRatings', function(req, res, next) {
    id.getAllRatings(function(result, status){
        res.send(result);
    });
  });
   /* Gets all the comments */
  router.get('/allComments', function(req, res, next) {
    id.getAllComments(function(result, status){
        res.send(result);
    });
  });
  
 
  /* Gets Itinerary by User */

  router.get('/itinerary/:ids', function(req, res, next){
    id.getItinerary(req.params.ids, function(result, status){
      res.send(result);
    });
  });
  
















  
  module.exports = router;