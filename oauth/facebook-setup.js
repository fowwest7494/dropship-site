const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
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
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);