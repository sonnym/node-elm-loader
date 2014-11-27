var ElmRunner = require("./elm_runner");

(function() {
  require.extensions[".elm"] = loadFile;
})();

function loadFile(module, filename) {
  var compiled = ElmRunner.compileFile(filename);

  return module._compile(compiled, filename);
}
