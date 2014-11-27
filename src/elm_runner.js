var fs = require("fs");
var path = require("path");
var vm = require("vm");

var execSync = require("child_process").execSync;
var EventEmitter = require("events").EventEmitter;

var Inflect = require("inflect-js");

var context = vm.createContext();

var elmRuntimePath = execSync("elm --get-runtime").toString().trim();

module.exports.compileFile = function(filename, callback) {
  var baseName = baseFileName(filename);
  var outputPath = path.join(path.dirname(filename), baseName + ".js");

  execSync("elm --only-js " + path.resolve(filename));

  return wrap(execute(outputPath), outputPath);
}

function execute(modulePath) {
  if (!context.Elm) {
    vm.runInContext(loadRuntime(), context, elmRuntimePath);
  }

  vm.runInContext(fs.readFileSync(modulePath), context, modulePath);

  return context.Elm;
}

function wrap(Elm, outputPath) {
  var baseName = baseFileName(outputPath);
  var moduleName = Inflect.classify(baseName);
  var emitter = new EventEmitter();

  return emitter;
}

function loadRuntime() {
  return fs.readFileSync(elmRuntimePath);
}

function baseFileName(filename) {
  return path.basename(filename, path.extname(filename));
}
