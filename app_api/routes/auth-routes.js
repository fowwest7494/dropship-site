const express = require('express')
const router = express.Router()
const passport = require('passport')


// auth login
router.get('/login', (req, res) => {
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
    res.render('index', {
    user:user, 
    assets: "../.", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    homeActive: 'active'
  });
})

// auth logout
router.get('/logout', (req, res) => {
	// handle the passport
	req.logout()
	res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
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
})

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
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
    homeActive: 'active',
  });
})

module.exports = router