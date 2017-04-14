'use strict';

module.exports = function() {

  $.gulp.task('copy:fonts', function() {
    return $.gulp.src('source/**/*.{woff,svg,ttf}')
   .pipe($.gulp.dest($.config.root + '/assets/'));
  });

};