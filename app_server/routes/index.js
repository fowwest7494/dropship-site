var express = require('express');
var router = express.Router();
const session = require('express-session');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
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
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    homeActive: 'active' 
  });
}); 

// Get cart page
router.get('/cart', function(req, res, next) {
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
  res.render('cart', {
    user:user, 
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    pagesActive: 'active',
    cartActive: 'active' 
  });
}); 

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
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
  res.render('checkout', {
    user:user, 
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    pagesActive: 'active',
    checkoutActive: 'active' 
  });
}); 

/* GET contact page. */
router.get('/contact', function(req, res, next) {
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
  res.render('contact', {
    user:user, 
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    contactActive: 'active' 
  });
}); 

/* GET details page. */
router.get('/detail', function(req, res, next) {
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
  res.render('detail', {
    user:user, 
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    detailActive: 'active' 
  });
}); 

/* GET shop page. */
router.get('/shop', function(req, res, next) {
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
  res.render('shop', {
    user:user, 
    assets: "", 
    logoutDisplay: logoutDisplay, 
    loginDisplay: loginDisplay, 
    registerDisplay: registerDisplay,
    shopActive: 'active' 
  });
});


module.exports = router;

