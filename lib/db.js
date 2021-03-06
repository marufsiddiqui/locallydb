(function() {
  var Collection, DB, fs;

  fs = require('fs');

  Collection = require('./collection');

  DB = (function() {
    function DB(path) {
      var stats;
      this.path = path;
      if (fs.existsSync(path)) {
        stats = fs.lstatSync(path);
        if (!stats.isDirectory()) {
          throw "Path should be a folder";
        }
      } else {
        fs.mkdirSync(path);
      }
    }

    DB.prototype.collection = function(name) {
      return new Collection(name, this);
    };

    return DB;

  })();

  module.exports = DB;

}).call(this);
