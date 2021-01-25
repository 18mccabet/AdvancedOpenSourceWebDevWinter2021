var express = require('express')
var app = express()
var path = require('path')
var port = 3000;

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'))
})
app.get('/about.html', function(req,res){
    res.sendFile(path.join(__dirname+'/views/about.html'))
})

app.use(express.static(__dirname+'/views'))

app.listen(port, function(){
    console.log('Connected on port 3000')
})