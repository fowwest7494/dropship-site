const express = require('express')
const router = express.Router()
const passport = require('passport')


// auth login
router.get('/login', (req, res) => {
	// Come back
	res.render('index', {user: req.user})
})

// auth logout
router.get('/logout', (req, res) => {
	// handle the passport
	req.logout()
	res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	// res.send(req.user)
	res.render('profile', {user: req.user})
})

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
	// res.send(req.user)
	res.render('profile', {user: req.user})
})

module.exports = router