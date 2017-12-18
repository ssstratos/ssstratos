'use strict';

window.headerScrollTop = 0;
// window.contentBoxValues = []
window.mouseDown = [false, 0];
window.workSliderMoved = false;

function setSideNav() {
  var $sideNav = $('.side-nav');

  $('[data-id]').each(function (_index, _elem) {

    var thisTitle = $(_elem).attr('data-title');
    var thisId = $(_elem).attr('id');

    var sideContent = '<a class="side-content" href="#' + thisId + '">\n    <div class="side-num">' + (_index.toString().length <= 1 ? '0' + (_index + 1) : _index + 1) + '</div>\n    <div class="sm-bold">' + thisTitle + '</div>\n    <div class="side-line">\n      <div class="side-line-bg"></div>\n    </div>\n    <div class="side-rect"></div></a>';

    $sideNav.find('.side-inner').append(sideContent);
  });
}

function hideHeaderScroll() {
  var $headerNav = $('.header-nav');
  var scrollTop = $(window).scrollTop();

  $headerNav.toggleClass('hidden', scrollTop > headerScrollTop);
  headerScrollTop = scrollTop;
}

function setServicesBoxesPos() {
  if ('.inner-content.circle-icons-text'.length === 0) return;

  var windowWidth = $(window).width();
  var divideWith = 5;

  if (windowWidth >= 961 && windowWidth < 1130) {
    divideWith = 8;
  }
}

function setWorkSlideHeight() {
  var windowWidth = $(window).width();
  var headerWidth = $('.header-nav').width();
  // let workSlidePadding = ((windowWidth - headerWidth) / 2)

  var $dragTl = $('.drag-timeline');
  var dragTlHeight = 0;

  $dragTl.each(function () {
    dragTlHeight += $(this).height();
  });

  $('.custom-content').css('height', dragTlHeight);
  // $('.work-slides .drag-timeline').css('padding-left', workSlidePadding)
}

$(document).ready(function () {

  if ($('.drag-timeline').length > 0) $('.drag-timeline').slick({
    speed: 300,
    variableWidth: true,
    infinite: false,
    slidesToScroll: 1
  });

  setServicesBoxesPos();

  if ($('html').hasClass('trident') === false && $('html').hasClass('mobile') === false && $('html').hasClass('tablet') === false) $("body").niceScroll();

  if ($('.side-nav').length > 0) setSideNav();

  if ($('body').hasClass('intro') && $('.goToHome').length > 0) $('.goToHome').focus();

  if ($('body').hasClass('intro') && window.location.hash === '#home') {

    $('body').removeClass('intro').addClass('home');
  }

  $(document).on('mousemove', function (e) {

    var $backfaceImg = $('.intro-video .backface-img');

    if ($backfaceImg.length > 0) {

      var bfWidth = $backfaceImg.width();
      var bfHeight = $backfaceImg.height();

      $backfaceImg.css({
        left: e.pageX - bfWidth / 2,
        top: e.pageY - bfHeight / 2
      });
    }
  });

  $(document).on('click touchstart', '.goToHome', function () {
    $('body').removeClass('intro').addClass('home');
    $("body").getNiceScroll().resize();
  });

  $(document).on('click', '.burger-btn', function () {
    if ($('body').hasClass('nav-open')) {
      $('body').removeClass('nav-open');
    } else {
      $('body').addClass('nav-open');
    }

    $("body").getNiceScroll().resize();
  });

  $(document).on('click', '.side-nav .side-content', function (e) {
    e.preventDefault();

    if ($(this).hasClass('active') === false) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 1500);
    }
  });

  $(document).on('click', '#backTop', function (e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 1500);
  });

  $(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('.anchor');
    var halfHeight = window.innerHeight / 2;
    $('.side-nav').removeClass('active');

    anchors.each(function (_index, _elem) {
      if (scrollTop > $(_elem).offset().top - halfHeight && scrollTop < $(_elem).offset().top + $(_elem).height() - halfHeight) {
        $('.side-nav .side-content[href="#' + $(_elem).attr('id') + '"]').addClass('active');
        $('.side-nav').addClass('active');
      } else {
        $('.side-nav .side-content[href="#' + $(_elem).attr('id') + '"]').removeClass('active');
      }
    });
  });

  // mousemoves for Work slider

  $(document).on('click', '.slide-item', function (e) {
    if (window.workSliderMoved) {
      e.preventDefault();
      window.workSliderMoved = false;
    }
  });

  $(document).on('click', '.categories-dropdown', function (e) {

    $(this).find('.dropdown-group').slideToggle(600);
  });

  $(document).on('click', '.close-modal, .modal-bg', function () {
    $('body').removeClass('modal-open');
  });

  $(document).on('click', '.iframe-layer', function () {
    var _this = this;

    var thisSrc = $(this).siblings('iframe').attr('src');
    $(this).siblings('iframe').attr('src', thisSrc + '&autoplay=1');

    setTimeout(function () {
      $(_this).remove();
    }, 200);
  });
});

$(window).on('resize', function () {
  setServicesBoxesPos();
});

$(window).on('load', function () {

  // if ($('.work-slides').length > 0)
  // setWorkSlideHeight()

  if ($('.section-loader').length > 0) {
    $('.section-loader').addClass('exit');

    setTimeout(function () {
      $('.section-loader').remove();
    }, 2900);
  }
});