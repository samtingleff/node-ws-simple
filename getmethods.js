var url = require("url"), sys = require("sys"), auth = require("./basicauth");

exports.shortBody = function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"} );
  res.write("hello world");
  res.end();
};

exports.longBody = function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": (1024*1024)} );
  var x = Buffer.alloc(1024);
  for (var i = 0; i < 1024; ++i) {
    res.write(x);
  }
  res.end();
};

exports.credentials = function(req, res) {
  var user = auth(req);
  var responseStatus = 403;
  if (user && user.name === 'foo' && user.pass === 'bar') {
    responseStatus = 200;
  }
  res.writeHead(responseStatus, {"Content-Type": "text/plain"});
  res.write("ok");
  res.end();
};

exports.queryParameter = function(req, res) {
  var urlParts = url.parse(req.url, true);
  var pname = urlParts.query["pname"];
  var pvalue = urlParts.query[pname];
  if (!pvalue)
    pvalue = "error";
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(pvalue);
  res.end();
};

exports.redirect = function(req, res) {
  var redirectUrl = req.url.split("/").slice(2).join("/");
  res.writeHead(301, {"Location": redirectUrl} );
  res.end();
};

exports.sleep = function(req, res) {
  var time = parseInt(req.url.split("/")[2]);
  setTimeout(function() {
    res.writeHead(200, {"Content-Type": "text/plain", "Content-Length":2});
    res.write("ok");
    res.end();
  }, time);
};
