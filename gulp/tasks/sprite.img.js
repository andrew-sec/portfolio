'use strict';

module.exports = function() {
  
  $.gulp.task('sprite:img', function() {
  $.gp.ongSpriteData = $.gulp.src('source/images/sprites/*.png').pipe($.gp.spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  $.gp.gifSpriteData = $.gulp.src('source/images/sprites/*.gif').pipe($.gp.spritesmith({
    imgName: 'sprite.gif',
    cssName: 'sprite.css'
  }));
  return $.gp.pngSpriteData.img.pipe($.gulp.dest($.config.root + '/assets/img/')),
         $.gp.gifSpriteData.img.pipe($.gulp.dest($.config.root + '/assets/img/')),
         $.gp.spriteData.css.pipe($.gulp.dest($.config.root + '/assets/css/'));
});

};