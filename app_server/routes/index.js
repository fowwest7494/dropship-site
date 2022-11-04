var express = require('express');
var router = express.Router();
const session = require('express-session');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
	
	res.render('index', {user:req.user});
}); 



module.exports = router;

