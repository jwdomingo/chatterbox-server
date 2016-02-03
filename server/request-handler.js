var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
  
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var storage = [];
var objectID = 0;
var file = './server/data.txt';

fs.readFile(file, function(error, data) {
  if (error) {
    console.error(error);
  } else {
    storage = JSON.parse(data);
    console.log('File Read Successful', storage);
  }
});

var sendResponse = function(response, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify({results:storage}));
};

var getHandler = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  sendResponse(response, 200);
};

var postHandler = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var buffer = '';
  
  request.on('data', function(chunk) {
    buffer += chunk.toString();
  });

  request.on('end', function() {
    var json = JSON.parse(buffer);
    json.objectId = ++objectID;
    storage.push(json);

    fs.writeFile(file, JSON.stringify(storage), function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log('File Write Successful');
      }
    });

    sendResponse(response, 201);
  });
};

exports.getHandler = getHandler;
exports.postHandler = postHandler;