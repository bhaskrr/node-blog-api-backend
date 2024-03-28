var express = require('express');
var router = express.Router();
const passport  = require('passport');

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', userController.login_get);

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureMessage: true }) ,userController.login_post);

router.get('/logout', userController.logout);


module.exports = router;
