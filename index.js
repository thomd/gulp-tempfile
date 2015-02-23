'use strict';

var through = require('through2');
var path    = require('path');
var tmpdir  = require('os').tmpdir();
var uuid    = require('uuid');
var mkdirp  = require('mkdirp');
var fs      = require('fs');

function tempfile(filepath) {
  return path.join(tmpdir, uuid.v4(), (filepath || ''));
}

module.exports = function(options) {

  return through.obj(function(file, encoding, callback) {
    var abspath = tempfile(file.path);

    var newFile = file.clone();
    mkdirp(path.dirname(abspath), function (err) {
      fs.writeFile(abspath, newFile.contents, function (err) {
        newFile.path = abspath;
        callback(err, newFile);
      });
    });

  }, function(callback) {
    // flush
  });
}
