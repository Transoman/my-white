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

  // SVG
  svg4everybody({});

});