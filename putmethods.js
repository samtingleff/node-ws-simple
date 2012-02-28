var url = require("url"), sys = require("sys");

exports.echoBody = function(req, res) {
  var body = new Array();
  req.addListener("data", function (chunk) {
    body.push(chunk);
  });
  req.addListener("end", function () {
    var contents = body.join("");
    if (!(req.method == "PUT")) {
      res.writeHead(400, {"Content-Type": "text/plain"});
      res.write("invalid method");
      res.end();
    } else {
      res.writeHead(200, {"Content-Type": "text/plain", "Content-Length":contents.length} );
      res.write(contents);
      res.end();
    }
  });
};
