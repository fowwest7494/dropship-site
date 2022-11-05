const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
var FacebookStrategy = require('passport-facebook')
const User = require('../app_api/models/User')
 
passport.serializeUser((user, done) => {
	done(null, user.id)	
})

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user)	
	})
})

passport.use(
	new GoogleStrategy({
	// options for the google strat
	callbackURL: '/auth/google/redirect',
	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	// passport callback function

	User.findOne({googleId:profile.id}).then((currentUser) => {
		if(currentUser){
		// already have a user
		console.log('user is: ' + currentUser)
		done(null, currentUser)
		} else {
			// if not, create user in db
			new User({
			username: profile.displayName,
			googleId: profile.id
		}).save().then((newUser) => {
			console.log('new user created' + newUser)
			done(null, newUser)
		})
	}
		
})
}))

passport.use(
	new FacebookStrategy({
	// options for the facebook strat
	callbackURL: '/auth/facebook/redirect',
	clientID: process.env.facebookClientID,
	clientSecret: process.env.facebookClientSecret
}, (accessToken, refreshToken, profile, done) => {
	// passport callback function

	User.findOne({facebookId:profile.id}).then((currentUser) => {
		if(currentUser){
		// already have a user
		console.log('user is: ' + currentUser)
		done(null, currentUser)
		} else {
			// if not, create user in db
			new User({
			username: profile.displayName,
			facebookId: profile.id
		}).save().then((newUser) => {
			console.log('new user created' + newUser)
			done(null, newUser)
		})
	}
		
})
}))