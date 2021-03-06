var Employee = require('./employee.model')
var debug = require('debug')('demo:employee')

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.employeesReadAll = function(req,res){
    debug('Getting all employees')

    Employee.find().exec().then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

module.exports.employeesReadOne = function(req,res){
    
    if(req.params && req.params.employeeid){
        debug('Getting single employee with id =', req.params.employeeid )

        Employee.findById(req.params.employeeid).exec().then(function(results){
            sendJSONresponse(res,200,results)
        })
        .catch(function(err){
            sendJSONresponse(res,404,{
                "message":"employeeid not found"
            })
        })
    }
    else{
        sendJSONresponse(res,404,{
            "message":"employeeid not found"
        })
    }
}

//post routes /api/v1/employees 

module.exports.employeesCreate = function(req,res){
    debug("Creating a employee", req.body)

    Employee.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary
    }).then(function(dataSaved){
        debug(dataSaved)
        sendJSONresponse(res,201,dataSaved)
    }).catch(function(err){
        debug(err)
        sendJSONresponse(res,400,err)
    })
}

module.exports.employeesUpdateOne = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found employeeid required"
        })
        return
    }

    Employee.findById(req.params.employeeid).exec()
    .then(function(employeeData){
        employeeData.firstName = req.body.firstName;
        employeeData.lastName = req.body.lastName;
        employeeData.department = req.body.department;
        employeeData.startDate = req.body.startDate;
        employeeData.jobTitle = req.body.jobTitle;
        employeeData.salary = req.body.salary;
        return employeeData.save()
    })
    .then(function(data){
        sendJSONresponse(res,200,data)
    }).catch(function(err){
        sendJSONresponse(res,400,err)
    })
}

module.exports.employeesDeleteOne = function(req,res){
    if(!req.params.employeeid){
        sendJSONresponse(res, 404,{
            "message":"Not found employeeid required"
        })
        return
    }

    Employee.findByIdAndRemove(req.params.employeeid).exec()
    .then(function(data){
        debug("Employee id " + req.params.employeeid + " deleted")
        debug(data)
        sendJSONresponse(res,204, null)
    }).catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

/////////////////////////Search and Sort

module.exports.employeesSearch = function(req,res){
    let val = req.params.searchVal
    var col = req.params.searchCol

    if(!val || !col){
        sendJSONresponse(res, 404,{
            "message":"Error: must input Column and Value"
        })
    }
    Employee.find({[col]:val}).exec()
    .then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}

module.exports.employeesSort = function(req,res){
    let col = req.params.sortCol

    if(!col){
        sendJSONresponse(res, 404,{
        "message":"Error: must input Column"
    })
    }
    Employee.find(col).exec()
    .then(function(results){
        sendJSONresponse(res,200,results)
    })
    .catch(function(err){
        sendJSONresponse(res,404,err)
    })
}
