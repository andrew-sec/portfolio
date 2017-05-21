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
  $('#flip-to-back').on('click', function () {
    $('.flip-container').addClass('visible-back');
    $('#flip-to-back').hide();
  });
  $('#flip-to-front').on('click', function () {
    $('.flip-container').removeClass('visible-back');
    $('#flip-to-back').show();
    setTimeout(function (){
      $('input, textarea').val('');
    }, 300)
  });
}());

/////////////////////// fullscreen menu + hamburger ///////////////////////
(function () {
  $('.hamburger').click(function () {
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

/////////////////////// welcome form validation ///////////////////////
$(function () {  
  $('#button_submit').on('click', function (e){
    e.preventDefault();
    if ($('#login').val() == '') { 
      $('.error-popup_login').show();
    } else if ($('#password').val() == '') { 
      $('.error-popup_pass').show(); 
    } else if (!$('#login' && '#password').val() == '') { 
      $('#form_welcome').submit();
    }
  });
  $( '#login, #password' ).focus(function() {
    $('.error-popup_login, .error-popup_pass').hide();
  });
}());

/////////////////////// works form validation ///////////////////////
$(function () {  
  $('#form_send').on('click', function (e){
    e.preventDefault();
    if ($('#form_name').val() == '') { 
      $('.error-popup_name').show();
    } else if ($('#form_email').val() == '') { 
      $('.error-popup_email').show(); 
    } else if (!$('#form_name' && '#form_email').val() == '') { 
      $('#form_works').submit();
    }
  });
  $( '#form_name, #form_email' ).focus(function() {
    $('.error-popup_name, .error-popup_email').hide();
  });
}());

///////////////////// slider ///////////////////////
var Slider = function (container) {
  var nextBtn = container.find('.slider__link_up'),
      prevBtn = container.find('.slider__link_down'),
      nextSliderItems = nextBtn.find('.slider__item'),
      prevSliderItems = prevBtn.find('.slider__item'),
      itemsLength = nextSliderItems.length,
      display = container.find('.slider__img_big'),
      title = container.find('.slider__title'),
      technology = container.find('.cources__text'),
      link = container.find('.slider__button_link'),
      duration = 500,
      isAnimate = false;
      this.counter = 0;
  this.moveSlide = function (direction) {
    var _that = this;
        directions = {
      next: function () {
        if (_that.counter < itemsLength - 1) {
          _that.counter++;
        } else {
          _that.counter = 0;
        }
      },
      prev: function () {
        if (_that.counter > 0) {
          _that.counter--;
        } else {
          _that.counter = itemsLength - 1;
        }
      }
    };
    directions[direction]();
    if(!isAnimate){
      isAnimate = true;
      nextSlide(_that.counter);
      prevSlide(_that.counter);
      changeData(_that.counter);
    }
  };
  var prevSlide = function (counter) {
    var reqItem = prevSliderItems.eq(counter - 1)
        activeItem = prevSliderItems.filter('.active-slide');
      animateSlide(activeItem, reqItem, 'prev');
  }
  var nextSlide = function (counter) {
      var activeItem = nextSliderItems.filter('.active-slide');
        reqSlide = counter + 1;
    if (reqSlide > itemsLength - 1) {
      reqSlide = 0;
    }
    var reqItem = nextSliderItems.eq(reqSlide);
    animateSlide(activeItem, reqItem, 'next');
  };
  var animateSlide = function (active, req, direction) {
    var _direction = direction == 'prev' ? 100 : -100;
    active.animate({
        'top': _direction + '%'
      }, duration, function() {
        $(this)
          .removeClass('active-slide')
          .css('top', -_direction + '%')
      });
    req.animate({
        'top': '0%'
      }, duration, function () {
        $(this).addClass('active-slide');
        isAnimate = false;
      });
  };
  var getData = function () {
    var dataObj = {
      images : [],
      title : [],
      technology : [],
      links : []
    }
    prevSliderItems.each( function () {
      var $this = $(this);
      dataObj.images.push($this.data('src'));
      dataObj.title.push($this.data('title'));
      dataObj.technology.push($this.data('tech'));
      dataObj.links.push($this.data('link'));
    });
    return dataObj;
  };
  var changeData = function (counter) {
    var data = getData();
    display.stop(true, true)
      .fadeOut(duration, function () {
        $(this).attr('src', data.images[counter]);
      }).stop(true, true)
      .fadeIn(duration);
    title.stop(true, true)
      .fadeOut(duration, function () {
        $(this).text(data.title[counter]);
      }).stop(true, true)
      .fadeIn(duration);
    technology.stop(true, true)
      .fadeOut(duration, function () {
        $(this).text(data.technology[counter]);
      }).stop(true, true)
      .fadeIn(duration);
    link.attr('href', data.links[counter]);
  };
};
var slider = new Slider($('.slider'));
$('.slider__link_up').on('click', function (e) {
  e.preventDefault();
  slider.moveSlide('next');
});
$('.slider__link_down').on('click', function (e) {
  e.preventDefault();
  slider.moveSlide('prev');
});