global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay');
import TweenMax from 'gsap/TweenMax';

jQuery(document).ready(function($) {
  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  var t1 = new TimelineMax({paused: true});
  t1.to('.mobile-menu', 0.8, {x:0});

  t1.staggerFrom(".mobile-menu__list li", 2, {
    opacity: 0,
    x: 100,
    ease: Power3.easeInOut
  }, 0.1, '-=0.5');

  t1.staggerFrom(".mobile-menu__social li", 1, {
    opacity: 0,
    y: 20,
    ease: Power3.easeInOut
  }, 0.1, '-=2');

  t1.from(".mobile-menu__phone", 1, {
    opacity: 0,
    y: 20,
    ease: Power3.easeInOut
  }, '-=1');
  t1.reverse();

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    t1.reversed(!t1.reversed());
  });

  $('.mobile-menu__close').on('click', function (e) {
    e.preventDefault();
    t1.reversed(!t1.reversed());
  });

  $('.ajax-form').submit(function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    ajaxSend($('.ajax-form'), data);
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        if ($(window).width() > 767) {
          var offset = $('.header__top').height();
        }
        else {
          var offset = $('.header__bottom').height();
        }

        if (!t1.reversed()) {
          t1.reversed(!t1.reversed());
        }
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 1000);
      }
    }
  });

  // Fixed header
  var fixedHeader = function(e) {
    if ($(window).width() > 767) {
      var h = $('.header__top').innerHeight();

      if (e.scrollTop() > 150) {
        $('.header').css('padding-bottom', h);
        $('.header__top').addClass('fixed');
      }
      else {
        $('.header').css('padding-bottom', 0);
        $('.header__top').removeClass('fixed');
      }
    }
    else {
      var h = $('.header__bottom').innerHeight();

      if (e.scrollTop() > 150) {
        $('.header').css('padding-bottom', h);
        $('.header__bottom').addClass('fixed');
      }
      else {
        $('.header').css('padding-bottom', 0);
        $('.header__bottom').removeClass('fixed');
      }
    }
  };

  fixedHeader($(this));

  $(window).scroll(function() {
    fixedHeader($(this));
  });

  // SVG
  svg4everybody({});

});