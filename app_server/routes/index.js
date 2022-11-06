var express = require('express');
var router = express.Router();
const session = require('express-session');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
	
	res.render('index', {user:req.user});
}); 

// Get cart page
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Cart', name: '' });
}); 

/* GET checkout page. */
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Cart', name: '' });
}); 

/* GET contact page. */
router.get('/contact', function(req, res, next) {
	var name = req.body.username
  res.render('contact', { title: 'Contact', name:name });
}); 

/* GET details page. */
router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Shopping details', name: 'FC Development' });
}); 

/* GET shop page. */
router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'shop', name: 'Dropship_site' });
});


module.exports = router;

