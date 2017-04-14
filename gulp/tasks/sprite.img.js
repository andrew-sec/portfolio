'use strict';

module.exports = function() {
  
  $.gulp.task('sprite:img', function () {
  $.gp.spriteData = $.gulp.src('source/images/sprites/*.*').pipe($.gp.spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return $.gp.spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img/')),
         $.gp.spriteData.css.pipe($.gulp.dest($.config.root + '/assets/css/'));
});

};