var express = require('express');
var router = express.Router();
var id = require('../Models/locationDAO');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*gets all the user info */
router.get('/info', function(req, res, next) {
  id.getUsers(function(result){
    res.send(result);
  });
});
/*Login */
router.post('/login', function (req, res, next) {
  id.login(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

/* Gets user info by ID */
router.get('/:idUser', function (req, res, next) {
  var idUser = req.params.idUser
  id.getId(idUser, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});

/* Register new people */
router.post('/register', function (req, res, next) {
  id.register(req.body, function (status, result) {
    if (status.code == 200)
      res.send(result);
    else {
      res.statusMessage = status.status;
      res.status(status.code).send({});
    }
  });
});
/* Updates profile */
router.put('/updateProfile', function (req, res, next) {
  id.updateUser(req.body, function (status, result) {
    
      res.send(result);
  });
});



module.exports = router;
