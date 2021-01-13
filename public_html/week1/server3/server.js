var http = require("http")
var url = require('url');

http.createServer(function(request, response){
    //gives you the complete URL with parameters
    var pathName = url.parse(request.url).pathname

    //http header
    //Content type: text/plain
    response.writeHead(200,{'Content-Type':'text/html'})
    //Send response to body
    response.write('<!DOCTYPE html><html><body><div>Request for ' + pathName + ' recieved </div></body></html>')
    response.end()
}).listen(3000);

console.log('Server running on port 3000');