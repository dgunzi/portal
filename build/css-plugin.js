function cssPlugin(options) {
  this.options = options;
}
function getIndex(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
}

function removeIndex(arr, val) {
  var index = getIndex(arr, val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
cssPlugin.prototype.apply = function(compiler) {
  var paths = this.options.paths;
  compiler.plugin('compilation', function(compilation, options) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      for (var i = paths.length - 1; i >= 0; i--) {
        removeIndex(htmlPluginData.assets.css, paths[i])
      }
      callback(null, htmlPluginData);
    });
  });
};

module.exports = cssPlugin;
