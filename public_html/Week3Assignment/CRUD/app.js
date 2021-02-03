//HdlBrs
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var hbs = require('hbs');

//Mongoose
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
const { response } = require('express')
//

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

///////////MongoDb Connection

//Sets up Middleware to use in app
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//Connect to MongoDb Database using Mongoose
mongoose.connect('mongodb://localhost:27017/Empl',{
    useNewUrlParser:true
}).then(function(){
    console.log("Connected to Database");
}).catch(function(err){
    console.log(err);
})

//Basic data entry with Mongoose and MongoDB
/*
var Employee = mongoose.model('Employee', {firstName:String, lastName:String, Department:String, startDate:Date, jobTitle:String, salary:Number})

var employee = new Employee({firstName:"Timothy", lastName:"McCabe", Department:"E204", startDate:'2016-05-18T16:00:00Z', jobTitle:"Intern", salary:49000});

employee.save().then(function(){
    console.log("Employee entry was saved")
})
*/

//Load in DB templates or Schema
require('./models/Employee')
//variable reference to model
var Employee = mongoose.model('employee')

//Form Routes//
app.post('/saveEmplEntry', function(req,res){
  console.log("Request Made")
  console.log(req.body)

  new Employee(req.body).save().then(function(){
      console.log("Data Saved")
      res.redirect('/view')
  })
})

app.get('/getData', function(req,res){
  Employee.find({}).then(function(employee){
    res.json({employee})
  })
})

app.post('/deleteEntry', function(req,res){
  console.log("Entry Deleted: ", req.body._id)
  Employee.findByIdAndDelete(req.body._id).exec()
  res.redirect('/view')
})

app.post('/updateEntry', function(req,res){
  console.log('Entry Updated')
  Employee.findByIdAndUpdate(req.body._id, )
})

//////////

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

hbs.registerPartials(__dirname + "/views/partials");

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


