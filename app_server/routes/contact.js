var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
	var name = req.body.username
  res.render('contact', { title: 'Contact', name:name });
}); 


module.exports = router;