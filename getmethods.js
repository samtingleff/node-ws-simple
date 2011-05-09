var url = require("url"), sys = require("sys");

exports.shortBody = function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'} );
  res.write("hello world");
  res.end();
};

exports.queryParameter = function(req, res) {
  var urlParts = url.parse(req.url, true);
  var pname = urlParts.query["pname"];
  var pvalue = urlParts.query[pname];
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(pvalue);
  res.end();
};
