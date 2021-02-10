var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



var color = ((1 << 24) * Math.random() | 0).toString(16);
hbs.registerHelper('table', function (num) {
    var msg = ""
    for (var i = 0; i < num; i++) {
        msg += "<tr>"
        for (var j = 0; j < num; j++) {
            color = ((1 << 24) * Math.random() | 0).toString(16)
            msg += `<td style='background-color: #` + color + `'>` + color.toUpperCase() + `<br><span style='color: #ffffff;'>` + color.toUpperCase() + `</span></td>`
        }
        msg += `</tr>`
    }
    return new hbs.handlebars.SafeString(msg)
})


hbs.registerHelper('error404', function () {
  var classes = ["still","rotate","shrink"]
  var msg = ""
  for (var i = 0; i < 6; i++) {
      msg += "<tr>"
      for (var j = 0; j < 6; j++) {
          msg += `<td><div class="`+classes[Math.floor((Math.random() * 3) + 0)]+`">404</div></td>`
      }
      msg += `</tr>`
  }
  return new hbs.handlebars.SafeString(msg)
})


app.get('/', function (req, res) {
  res.render('index.hbs')
})

app.post('/colors', function (req, res) {
  res.render('colors.hbs', {
      num: req.body.numForm
  })
})

app.use('/', indexRouter);
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
