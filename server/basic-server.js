var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var express = require("express");

var handler = require("./request-handler.js");

var app = express();

app.use(express.static(__dirname + "/../client/"));

app.get('/classes/messages/', handler.requestHandler);
app.get('/classes/room1/', handler.requestHandler);
app.post('/classes/messages/', handler.requestHandler);

var port = 3000;
var ip = "127.0.0.1";

app.listen(port, function() {
  console.log("Listening on http://" + ip + ":" + port);  
});