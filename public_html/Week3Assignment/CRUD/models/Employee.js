const { Mongoose } = require("mongoose");

var mongoose = require('mongoose')
var schema = mongoose.Schema;

var EmployeeSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})

//Employee might need to be employees
mongoose.model('employee', EmployeeSchema)