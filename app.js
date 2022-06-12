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
var aboutRouter = require('./app_server/routes/about');
var teamRouter = require('./app_server/routes/team');
var blogRouter = require('./app_server/routes/blog');
var portfolioRouter = require('./app_server/routes/portfolio');
var servicesRouter = require('./app_server/routes/services');
var blogDetailsRouter = require('./app_server/routes/blog-details');
var contactRouter = require('./app_server/routes/contact');
var portfolioDetailsRouter = require('./app_server/routes/portfolio-details');
var usersRouter = require('./app_server/routes/users');

app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/team', teamRouter);
app.use('/blog', blogRouter);
app.use('/portfolio', portfolioRouter);
app.use('/services', servicesRouter);
app.use('/blog-details', blogDetailsRouter);
app.use('/contact', contactRouter);
app.use('/portfolio-details', portfolioDetailsRouter);
app.use('/users', usersRouter);

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
