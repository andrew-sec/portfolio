'use strict';

module.exports = function() {
  
  $.gulp.task('sprite:img', function() {
  $.gp.spriteData = $.gulp.src('source/images/icons/*.png').pipe($.gp.spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssFormat: 'css',
    imgPath: $.config.root + '/assets/img/',
    padding: 70
  }));

  return  $.gp.spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img/')),
          $.gp.spriteData.css.pipe($.gulp.dest($.config.root + '/assets/css/'));
});

};