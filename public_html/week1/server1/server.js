var http = require("http")

http.createServer(function(request, response){
    //http header
    //Content type: text/plain
    response.writeHead(200,{'Content-Type':'text/plain'})
    //Send response to body
    response.end('Hello World\n')
}).listen(3000);

console.log('Server running on port 3000');