var Elm = require("./../src/register");

exports.testFileLoad = function(test) {
  var constant = require("./fixtures/constant_port.elm");

  test.assert(constant instanceof EventEmitter);

  test.done();
};
