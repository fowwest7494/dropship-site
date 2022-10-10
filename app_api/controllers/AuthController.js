const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

		var errorcheck = req.body;
		console.log(JSON.stringify(errorcheck));

		user.save()
		.then(user => {
			// res.json({
			// 	message: 'User saved successfully!'
			// })
			return res.redirect('/');
		})
		.catch(error => {
			res.json({
				message: 'An Error occurred!'
			})
		})
	})
}

const login = (req, res, next) => {
	var username = req.body.username
	var password = req.body.password

	User.findOne({$or: [{email:username}, {phone:username}]})
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
					res.redirect('/')
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
	register, login
}