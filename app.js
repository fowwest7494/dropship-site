const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const router = express.Router()
const passportSetup = require('./oauth/passport-setup')
const cookieSession = require('cookie-session')
const expressSession = require('express-session')
const passport = require('passport')

// Routes
var indexRouter = require('./app_server/routes/index');
var googleAuthRouter = require('./app_server/routes/google-auth-routes')
var facebookAuthRouter = require('./app_server/routes/facebook-auth-routes')

// API Routes
var authRouter = require('./app_api/routes/auth-routes')
var profileRouter = require('./app_api/routes/profile-routes')

var app = express();

// Db connection
require('./app_api/models/db');

app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'jade');

app.use(cookieSession({
  // One day
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}))

//initialize passport
app.use(passport.initialize())
app.use(passport.session())
require('./oauth/passport-setup');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// App server routes
app.use('/', indexRouter);
app.use('/auth/google', googleAuthRouter);
app.use('/auth/facebook', facebookAuthRouter);

//api
app.use('/auth', authRouter);  
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
