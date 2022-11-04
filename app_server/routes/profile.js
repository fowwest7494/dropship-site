var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var app = express()

/* GET profile home page. */
router.get('/profile', function(req, res, next) {

    res.render('index', {user:req.user})
}); 

module.exports = router 