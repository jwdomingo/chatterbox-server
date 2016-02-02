  // http://nodejs.org/documentation/api/
var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  if (request.method === "OPTIONS") {
    response.writeHead(200, 'OK', headers);
    response.end();
  } else if (request.method === "GET") {
    if (request.url === "/classes/room1") {
      response.writeHead(200, headers);
      response.end(JSON.stringify({results:storage}));
    } else if (request.url === "/classes/messages") {
      response.writeHead(200, headers);
      response.end(JSON.stringify({results:storage}));
    } else {
      response.writeHead(404, headers);
      response.end();
    }
  } else if (request.method === "POST") {
    var body = '';
    request.on('data', function(chunk) {
      body += chunk.toString();
    });

    request.on('end', function() {
      response.writeHead(201, 'OK', headers);

      var decodeBody = JSON.parse(body);
      storage.push(decodeBody);

      response.end(JSON.stringify({results:storage}));
    });
  }
};

var storage = [];
  
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;