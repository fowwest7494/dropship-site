var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var app = express()

/* GET profile home page. */
router.get('/profile/:name', function(req, res, next) {

    res.render('index', {name: req.params.username})
}); 

module.exports = router 