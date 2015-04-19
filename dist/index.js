(function() {
  var _, defaults, fs, path, t2,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  t2 = require('through2');

  _ = require('underscore');

  fs = require('fs');

  defaults = {
    ext: ['.png', '.jpg', '.jpeg', '.gif']
  };

  module.exports = function(file) {
    var ref;
    if (ref = path.extname(file), indexOf.call(defaults.ext, ref) < 0) {
      return t2();
    }
    return t2.obj(function(data, enc, cb) {
      var self;
      self = this;
      return fs.readFile(file, function(err, data) {
        var out;
        out = "img = document.createElement('img');";
        out += "img.src = 'data:image/png;base64,";
        out += new Buffer(data).toString('base64');
        out += "';module.exports = img;";
        self.push(new Buffer(out));
        return cb();
      });
    });
  };

}).call(this);
