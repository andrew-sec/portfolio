/////////////////////// parallax on mousemove ///////////////////////
if($('#parallax').length) {
  (function () {
    var parallaxContainer = document.getElementById('parallax'),
      layers = parallaxContainer.children;
    window.addEventListener('mousemove', function (e) {
      var pageX = e.pageX,
          pageY = e.pageY,
          initialX = (window.innerWidth / 2) - pageX,
          initialY = (window.innerHeight / 2) - pageY;
      [].slice.call(layers).forEach(function (layer, i) {
        var
          divider = i / 100,
          bottomPosition = (window.innerHeight / 2) * divider,
          positionX = initialX * divider,
          positionY = initialY * divider,
          layerStyle = layer.style,
          transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';
          layerStyle.transform = transformString;
          layerStyle.bottom = '-' + bottomPosition + 'px';
      });
    });
  }()); 
}
/////////////////////////// parallax onscroll /////////////////////////
var parallax = (function () {
  var bg = document.getElementById('header__bg');
  var user = document.getElementById('login-box');
  var sectionText = document.getElementById('title_image_transparent');
  // var bg = document.querySelector('.header__bg');
  // var user = document.querySelector('.login-box');
  // var sectionText = document.querySelector('.title_image_transparent');
  function move (block, windowScroll, strafeAmount) {
    var strafe = windowScroll / -strafeAmount + '%';
    var transformString = 'translate3d(0, ' + strafe + ', 0)';
    var style = block.style;
    style.transform = transformString;
    style.webkitTransform = transformString;
  }
  return {
    init: function (wScroll) {
      move(bg, wScroll, 70);
      move(sectionText, wScroll, 15);
      move(user, wScroll, 10);
    }
  }
}());
window.onscroll = function () {
  var wScroll = window.pageYOffset;
  parallax.init(wScroll);
}

////////////////////////// preloader /////////////////////////
var preloader = (function () {
  var percentsTotal = 0,
      preloader = $('.preloader');
  var imgPath = $('*').map(function (ndx, element) {
    var background = $(element).css('background-image'),
        img = $(element).is('img'),
        path = '';
    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }
    if (img) {
      path = $(element).attr('src');
    }
    if (path) return path
  });
  var setPercents = function (total, current) {
    var persents = Math.ceil(current / total * 100);
    $('.preloader__percents').text(persents + '%');
    if (persents >= 100) {
      preloader.fadeOut();
    }
  }
  var loadImages = function (images) {
    if (!images.length) preloader.fadeOut();
    images.forEach(function (img, i, images) {
      var fakeImage = $('<img>', {
        attr: {
          src: img
        }
      });
      fakeImage.on('load error', function () {
        percentsTotal++;
        setPercents(images.length, percentsTotal);
      });
    });
  }
  return {
    init: function () {
      var imgs = imgPath.toArray();
      loadImages(imgs);
    }
  }
}());
$(function () {
  preloader.init();
});

/////////////////////// flip ///////////////////////////////
(function () {
  $("#flip-to-back").on('click', function () {
    $('.flip-container').addClass('visible-back');
    $('#flip-to-back').hide();
  });
  $("#flip-to-front").on('click', function () {
    $('.flip-container').removeClass('visible-back');
    $('#flip-to-back').show();
  });
}());

/////////////////////// fullscreen menu + hamburger ///////////////////////
(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass('open');
    $('.fullscreen-menu').fadeToggle('slow', 'linear');
    $('.fullscreen-menu__bg').toggleClass('active');
    $('.aside, .section_content').removeClass('fixed_on_phone');
    setTimeout(function () {
      $('.fullscreen-menu__nav').slideToggle(500);
    }, 700);
  });
}());

/////////////////////// slide-menu ///////////////////////
$(function () {
  $('.menu-trigger').on('click', function () {
    $(this).toggleClass('menu-trigger_active');
    $('.aside, .section_content').toggleClass('fixed_on_phone');
  });
}());