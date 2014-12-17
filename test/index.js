var fs = require("fs");
var path = require("path");
var EventEmitter = require("events").EventEmitter;

var Elm = require("./../");

process.on("uncaughtException", function(err) {
  console.error("\nERROR RUNNING TESTS:\n  " + require("util").inspect(err));
  process.exit(1);
});

exports.basicFunctionality = {
  setUp: function(callback) {
    this.module = Elm(path.resolve(__dirname, "fixtures/empty_module.elm"));
    callback();
  },

  testConstructorFunction: function(test) {
    test.equal(this.module.constructor.name, "ElmRunner");
    test.done();
  },

  testModuleNameResolution: function(test) {
    test.equal(this.module.moduleName, "EmptyModule");
    test.done();
  },

  testExposureOfPortsObjectOnWrapper: function(test) {
    test.equal(this.module.compiledModule.ports, this.module.ports);
    test.done();
  }
};

exports.testConventionalElmModelNames = function(test) {
  var module = Elm(path.resolve(__dirname, "fixtures/EmptyModule.elm"));
  test.equal(module.moduleName, "EmptyModule");
  test.done();
};

exports.testBuildsNewObject = function(test) {
  test.notEqual(
    Elm(path.resolve(__dirname, "fixtures/empty_module.elm")),
    Elm(path.resolve(__dirname, "fixtures/empty_module.elm"))
  );

  test.done();
};

exports.fsManagement = {
  testDoesNotOverwriteExistingFile: function(test) {
    test.throws(function() {
      Elm(path.resolve(__dirname, "fixtures/conflicting_file.elm"));
    });

    test.done();
  },

  testCleansUpCompiledFiles: function(test) {
    var module = Elm(path.resolve(__dirname, "fixtures/empty_module.elm"));

    fs.exists(module.outputPath, function(exists) {
      test.ok(!exists);
      test.done();
    });
  }
};

exports.testConstantPort = function(test) {
  var constantPort = Elm(path.resolve(__dirname, "fixtures/constant_port.elm"));

  constantPort.emitter.on("messageOut", function(message) {
    test.equal(message, "test from elm");
    test.done();
  });
};

exports.testEchoPort = function(test) {
  var echoPort = Elm(path.resolve(__dirname, "fixtures/echo_port.elm"), {
    messageIn: ""
  });
  var message = "test from node";

  echoPort.emitter.on("messageOut", function(echo) {
    test.equal(echo, '"' + message + '"'); // the message comes back from elm with extra quotation marks
    test.done();
  });

  echoPort.emitter.emit("messageIn", message);
};
