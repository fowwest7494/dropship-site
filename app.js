require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const router = express.Router()

var app = express();

// Db connection
require('./app_api/models/db');

// Routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var shopRouter = require('./app_server/routes/shop');
var detailRouter = require('./app_server/routes/detail');
var cartRouter = require('./app_server/routes/cart');
var contactRouter = require('./app_server/routes/contact');
var checkoutRouter = require('./app_server/routes/checkout');
var profileRouter = require('./app_server/routes/profile');

var AuthRouter = require('./app_api/routes/auth');

app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);
app.use('/detail', detailRouter);
app.use('/cart', cartRouter);
app.use('/contact', contactRouter);
app.use('/checkout', checkoutRouter);

//api
app.use('/api', AuthRouter)

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
