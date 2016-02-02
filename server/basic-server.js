var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var handler = require("./request-handler.js");

var port = 3000;
var ip = "127.0.0.1";

fs.readFile('./client/index.html', function (error, html) {
  if (error) { throw error; }
  // var server = http.createServer(handler.requestHandler);
  var server = http.createServer(function(request, response) {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
  });
  console.log("Listening on http://" + ip + ":" + port);
  server.listen(port, ip);
});