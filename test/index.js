var fs = require("fs");
var path = require("path");
var EventEmitter = require("events").EventEmitter;

var Elm = require("./../src/elm_runner");

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
  }
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
