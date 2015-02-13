'use strict';
var util    = require('gulp-util');
var through = require('through2');

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    // transform
    callback(null, file); // noop
  }, function(callback) {
    // flush
  });
}
