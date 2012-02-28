var url = require("url"), sys = require("sys");

exports.deleteTest = function(req, res) {
  if (!("DELETE" == req.method)) {
    res.writeHead(400, {"Content-Type": "text/plain"});
    res.write("bad method: " + req.method);
    res.end();
  } else {
    res.writeHead(204, {"Content-Type": "text/plain"});
    res.end();
  }
};
