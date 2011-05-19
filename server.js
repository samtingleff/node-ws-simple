var http = require("http"), sys = require("sys");
var responsecode = require("./responsecode");
var getmethods = require("./getmethods");
var headermethods = require("./headermethods");
var postmethods = require("./postmethods");
var port = 8002;

var responseCodePattern = new RegExp("^/code/[0-9]+$");
var sleepPattern = new RegExp("^/sleep/[0-9]+$");
var shortBodyPattern = new RegExp("^/short/$");
var queryParamPattern = new RegExp("^/param/\?.+$");
var headerPattern = new RegExp("^/header/\?.+$");
var echoPostBody = new RegExp("^/post/$");

http.createServer(function (req, res) {
  var handler = null;
  if (responseCodePattern.test(req.url)) {
    handler = responsecode.execute;
  } else if (sleepPattern.test(req.url)) {
    handler = getmethods.sleep;
  } else if (shortBodyPattern.test(req.url)) {
    handler = getmethods.shortBody;
  } else if (queryParamPattern.test(req.url)) {
    handler = getmethods.queryParameter;
  } else if (headerPattern.test(req.url)) {
    handler = headermethods.echoHeader;
  } else if (echoPostBody.test(req.url)) {
    handler = postmethods.echoBody;
  }

  if (handler == null) {
    handler = function(req, res) {
      res.writeHead(400, {"Content-Type": "text/plain"});
      res.write("Unknown body");
      res.end();
    };
  }

  handler(req, res);

}).listen(port);
