const User = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require('path')
const jwt = require('jsonwebtoken')
var express = require('express')
var session = require('express-session')
const cookieParser = require('cookie-parser')


const register = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
		if(err) {
			res.json({
				error: "error"
			})
		}

		let user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPass 
		})

		user.save() 
		.then(user => {
			// res.json({
			// 	message: 'User saved successfully!'
			// })
			res.redirect('/?name=' + user.username);
		})
		.catch(error => {
			res.json({
				message: 'An Error occurred!'
			})
		})
	})
}

const login = (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	User.findOne({$or: [{username:username}, {email:username}]})
	.then(user => {
		if(user) {
			bcrypt.compare(password, user.password, function(err, result) {
				if(err) {
					res.json({
						error: err
					})
				}

				if(result) {
				    //Successful Login
				    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
				    // res.json({user})
				    // res.session.username = user.name;
				    res.redirect('/?name=' + user.username)
					}
					
				else {
					res.json({
						message: 'Password does not match!'
					})
				}
			})
		} else {
			res.json({
				message: 'No user found!'
			})
		}
	})
	 
}

module.exports = {
	register, login
}
