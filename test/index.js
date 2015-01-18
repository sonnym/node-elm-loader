var fs = require("fs");
var path = require("path");
var EventEmitter = require("events").EventEmitter;

var Elm = require("./../");

var fixturePath = path.resolve(__dirname, "fixtures")

process.on("uncaughtException", function(err) {
  console.error("\nERROR RUNNING TESTS:\n  " + require("util").inspect(err));
  process.exit(1);
});

exports.basicFunctionality = {
  setUp: function(callback) {
    this.module = Elm(path.resolve(__dirname, "fixtures/empty_module.elm"), fixturePath);
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
  },

  testRemovesBuildArtifactsOnFailure: function(test) {
    var module = Elm(path.resolve(__dirname, "fixtures/failing.elm"), fixturePath);
    test.ok(!fs.existsSync(path.resolve(fixturePath, "failing.js")));
    test.done();
  }
};

exports.testConventionalElmModelNames = function(test) {
  var module = Elm(path.resolve(__dirname, "fixtures/EmptyModule.elm"), fixturePath);
  test.equal(module.moduleName, "EmptyModule");
  test.done();
};

exports.testNestedModules = function(test) {
  Elm(path.resolve(__dirname, "fixtures/Nested/Module.elm"), fixturePath);
  test.done();
};

exports.testBuildsNewObject = function(test) {
  test.notEqual(
    Elm(path.resolve(__dirname, "fixtures/empty_module.elm"), fixturePath),
    Elm(path.resolve(__dirname, "fixtures/empty_module.elm"), fixturePath)
  );

  test.done();
};

exports.fsManagement = {
  testDoesNotOverwriteExistingFile: function(test) {
    test.throws(function() {
      Elm(path.resolve(__dirname, "fixtures/conflicting_file.elm"), fixturePath);
    });

    test.done();
  },

  testCleansUpCompiledFiles: function(test) {
    var module = Elm(path.resolve(__dirname, "fixtures/empty_module.elm"), fixturePath);

    fs.exists(module.outputPath, function(exists) {
      test.ok(!exists);
      test.done();
    });
  }
};

exports.testConstantPort = function(test) {
  var constantPort = Elm(path.resolve(__dirname, "fixtures/constant_port.elm"), fixturePath);

  constantPort.emitter.on("messageOut", function(message) {
    test.equal(message, "test from elm");
    test.done();
  });
};

exports.testEchoPort = function(test) {
  var echoPort = Elm(path.resolve(__dirname, "fixtures/echo_port.elm"), fixturePath, {
    messageIn: ""
  });
  var message = "test from node";

  echoPort.emitter.on("messageOut", function(echo) {
    test.equal(echo, message);
    test.done();
  });

  echoPort.emitter.emit("messageIn", message);
};
