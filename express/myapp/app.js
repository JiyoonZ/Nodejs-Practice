var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//주소를 찾는 것을 routing
var usersRouter = require('./routes/users');
//간단실습
const testRouter = require('./routes/call');
// 간단 실습예제2
const postRouter = require('./routes/post');
const dbconnect = require('./models/index');
dbconnect();
var app = express();

// view engine setup
// views 들이 담겨져 있는 경로를 지정 
app.set('views', path.join(__dirname, 'views'));
// view 엔진이 읽는 대상은 ejs 로 하겠다.
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// 실습예제1
app.use('/test', testRouter);
// 실습예제2
app.use('/expost',postRouter)

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
