var exec = require("child_process").exec;
var fs = require("fs");

module.exports = function rinhaExecutor() {
  exec("rinha .\\source.rinha", function (error, stdout, stderr) {
    fs.writeFile("source.rinha.json", stdout, function (err) {
      if (err) {
        console.log(err);
      }
    });
    console.log(stderr);
    if (error !== null) {
      console.log("exec error: " + error);
    }
  });
}