var path = require("path");
var Elm = require("./../");

var compiledCode = Elm(path.resolve(__dirname, "ticking_port.elm"), "example");

compiledCode.emitter.on("messageOut", function(message) {
  console.log(message)
});
