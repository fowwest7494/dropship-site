require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// console.log(process.env.DB_HOST)
// console.log(process.env.HEROKU_URL);
// console.log(process.env.MONGODB_URI);

// Routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var shopRouter = require('./app_server/routes/shop');
var detailRouter = require('./app_server/routes/detail');
var cartRouter = require('./app_server/routes/cart');
var contactRouter = require('./app_server/routes/contact');
var checkoutRouter = require('./app_server/routes/checkout');

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
