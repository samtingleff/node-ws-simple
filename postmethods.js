var url = require("url"), sys = require("sys");

exports.echoBody = function(req, res) {
  var body = new Array();
  req.addListener("data", function (chunk) {
    body.push(chunk);
  });
  req.addListener("end", function () {
    var contents = body.join("");
    res.writeHead(200, {"Content-Type": "text/plain", "Content-Length":contents.length} );
    res.write(contents);
    res.end();
  });
};

exports.echoParams = function(req, res) {
  var body = new Array();
  req.addListener("data", function (chunk) {
    body.push(chunk);
  });
  req.addListener("end", function () {
    var contents = body.join("");
    res.writeHead(200, {"Content-Type": "text/plain", "Content-Length":contents.length} );
    res.write(contents);
    res.end();
  });
};
