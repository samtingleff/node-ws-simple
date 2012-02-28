var http = require("http"), sys = require("sys");
var responsecode = require("./responsecode");
var getmethods = require("./getmethods");
var headermethods = require("./headermethods");
var postmethods = require("./postmethods");
var putmethods = require("./putmethods");
var deletemethods = require("./deletemethods");
var port = process.env.PORT || 3000;

var responseCodePattern = new RegExp("^/code/[0-9]+$");
var sleepPattern = new RegExp("^/sleep/[0-9]+$");
var shortBodyPattern = new RegExp("^/short/$");
var redirectPattern = new RegExp("^/redirect/.+$");
var queryParamPattern = new RegExp("^/param/\?.+$");
var headerPattern = new RegExp("^/header/\?.+$");
var echoPostBody = new RegExp("^/post/$");
var echoPutBody = new RegExp("^/put/$");
var deleteTestPattern  = new RegExp("^/delete/$");

http.createServer(function (req, res) {
  var handler = null;
  if (responseCodePattern.test(req.url)) {
    handler = responsecode.execute;
  } else if (sleepPattern.test(req.url)) {
    handler = getmethods.sleep;
  } else if (shortBodyPattern.test(req.url)) {
    handler = getmethods.shortBody;
  } else if (redirectPattern.test(req.url)) {
    handler = getmethods.redirect;
  } else if (queryParamPattern.test(req.url)) {
    handler = getmethods.queryParameter;
  } else if (headerPattern.test(req.url)) {
    handler = headermethods.echoHeader;
  } else if (echoPostBody.test(req.url)) {
    handler = postmethods.echoBody;
  } else if (echoPutBody.test(req.url)) {
    handler = putmethods.echoBody;
  } else if (deleteTestPattern.test(req.url)) {
    handler = deletemethods.deleteTest;
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
