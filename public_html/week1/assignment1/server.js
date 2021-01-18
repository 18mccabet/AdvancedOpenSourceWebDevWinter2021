var express = require('express')
var app = express();
var path = require('path');

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/todo', function(req, res) {
    res.sendFile(path.join(__dirname + '/todo.json'));
});

app.get('/read-todo', function(req, res) {
    res.sendFile(path.join(__dirname + '/read-todo.html'));
});

/* Send the HTTP header
* HTTP Status: 301 : Moved Permanently
* Location:'http://' +  'The host of the requested location' + the path to the page that you want to be redirected to.
*/
app.get(function(req, res) {
    res.writeHead(301, {'Location': "http://" + request.headers['host'] + '/index.html' });
});




app.listen(3000);

console.log('Server running on port 3000');