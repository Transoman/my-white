global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay');

jQuery(document).ready(function($) {
  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $('.mobile-menu').addClass('open');
  });

  $('.mobile-menu__close').on('click', function (e) {
    e.preventDefault();
    $('.mobile-menu').removeClass('open');
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

        var offset = 0;

        if ($(window).width() > 767) {
          offset = $('.header__top').outerHeight();
        }
        else {
          offset = $('.header__bottom').outerHeight();
        }

        $('.mobile-menu').removeClass('open');
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