var url = require("url"), sys = require("sys");

exports.echoHeader = function(req, res) {
  var urlParts = url.parse(req.url, true);
  var hname = urlParts.query["hname"];
  var hvalue = req.headers[hname];
  if (!hvalue)
    hvalue = "error";
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(hvalue);
  res.end();
};
