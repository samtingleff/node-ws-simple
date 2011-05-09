var url = require("url"), sys = require("sys");

exports.execute = function(req, res) {
  var code = parseInt(req.url.split("/")[2]);
  res.writeHead(code, {"Content-Type": "text/plain", "Content-Length":0} );
  res.end();
};
