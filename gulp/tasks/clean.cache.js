'use strict';

module.exports = function() {
   $.gulp.task('clean:cache', function (done) {
  return $.gp.cache.clearAll(done);
});
};