var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// var ctrlAdmin = require('../controllers/admin');
// var ctrlBlog = require('../controllers/blog');

// var Admin = mongoose.model('Admin');
// var Blog = mongoose.model('Blog');


/* GET team page. */

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Portfolio', name: 'FC Development' });
}); 

module.exports = router;