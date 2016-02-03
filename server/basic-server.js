var express = require("express");
var handler = require("./request-handler.js");

var app = express();

app.use(express.static(__dirname + "/../client/"));

app.get('/classes/messages', function(request, response) {
  handler.getHandler(request, response);
});


app.post('/classes/messages', function(request, response) {
  handler.postHandler(request, response);
});

var port = 3000;
var ip = "127.0.0.1";

app.listen(port, function() {
  console.log("Listening on http://" + ip + ":" + port);  
});