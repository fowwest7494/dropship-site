const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express');
const path = require('path');
const router = express.Router()

var app = express()

app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

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
			return res.redirect('back');
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
					let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
					console.log(req.session)
					return res.render('index', {name: req.body.username})
					
					
				} else {
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
	register, login, router
}
