var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var app = express()

/* GET profile home page. */
router.get('/profile', function(req, res, next) {

  var user = ""
  var logoutDisplay = ''
  var loginDisplay = ''
  var getUser = function() {
    if (req.user) {
      user = req.user
    } else {
      user = ""
    }
  }
  var toggleLoginRegister = function() {
    if(req.user) {
      logoutDisplay = 'block'
      loginDisplay = 'none'
      registerDisplay = 'none'
    } else {
      logoutDisplay = 'none'
      loginDisplay = 'block'
      registerDisplay = 'block'
    }
  }
  toggleLoginRegister();
  getUser();
    res.render('profile', {
    user:user, 
    assets: "../.", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    homeActive: 'active'
  });
}); 

module.exports = router 