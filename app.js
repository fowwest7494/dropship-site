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
var usersRouter = require('./app_server/routes/users');
var shopRouter = require('./app_server/routes/shop');
var detailRouter = require('./app_server/routes/detail');
var cartRouter = require('./app_server/routes/cart');
var contactRouter = require('./app_server/routes/contact');
var checkoutRouter = require('./app_server/routes/checkout');

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
app.use(express.static(path.join(__dirname, 'public')));;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/detail', detailRouter);
app.use('/cart', cartRouter);
app.use('/contact', contactRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter); 
app.use('/profile', profileRouter);

//api
app.use('/', indexRouter);
app.use('/auth', authRouter);  
app.use('/users', usersRouter);
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
