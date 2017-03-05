"use strict";



// Variables
// ===================

var $html = $('html'),
    $document = $(document),
    $window = $(window),
    i = 0;


// Scripts initialize
// ===================

document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');
document.write('<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>');

$(window).on('load', function () {

  // =======
  // Preloader
  // =======

  var $preloader = $('#page-preloader'),
      $spinner   = $preloader.find('.spinner');

  $spinner.fadeOut();
  $preloader.delay(500).fadeOut('slow');


  // =======
  // Google Map
  // =======
  var mapWrapper = $('#google-map'),
      latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
      styles = [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            { "saturation": 36 },
            { "color": "#000000" },
            { "lightness": 40 }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            { "visibility": "on" },
            { "color": "#000000" },
            { "lightness": 16 }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 20 }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 17 },
            { "weight": 1.2 }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 20 }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 21 }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 17 }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 29 },
            { "weight": 0.2 }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 18 }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 16 }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 19 }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 17 }
          ]
        }
      ],
      myOptions = {
        scrollwheel: false,
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: styles
      },
      map = new google.maps.Map(mapWrapper[0], myOptions),
      marker = new google.maps.Marker({
        position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
        draggable: false,
        animation: false,
        map: map,
        icon: 'img/marker.png'
      }),
      infowindow = new google.maps.InfoWindow({
        content: "<div class='marker-popup'> Mr John Smith 132, My Street, Bigtown BG23 4YZ England </div>"
      });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
});


$document.ready(function () {

  var ua = navigator.userAgent,
      bstype;

  // Get IE or Edge browser version
  var version = detectIE();

  if (version) bstype = 'Internet-Explorer'.toLowerCase();
  if (ua.search(/Firefox/) > 0) bstype = 'Firefox'.toLowerCase();
  if (ua.search(/Chrome/) > 0) bstype = 'Google-Chrome'.toLowerCase();
  if (ua.search(/Safari/) > 0) bstype = 'Safari'.toLowerCase();

  $html.addClass(bstype);

  function detectElement(dom) {
    return $window.height() + $window.scrollTop() >= dom.offset().top && $window.scrollTop() <= dom.outerHeight() + dom.offset().top;
  }

  function bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
      new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
      new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
  }


  // ==========
  // jQuery ajaxChimp
  // ==========
  var chimpForm = $('.subscription-form form');

  chimpForm.ajaxChimp({
    callback: function(){
      var panel = $('.js-result');
      setTimeout(function () {
        panel.removeClass("error").removeClass("success");
      }, 4500);
    },
    language: 'cm',
    url: '//cear-studio.us13.list-manage.com/subscribe/post?u=5c10401fe692f6eddbd86220f&amp;id=b974661486'
    //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
  });


  $.ajaxChimp.translations.cm = {
    'submit': 'Submitting...',
    0: 'We have sent you a confirmation email',
    1: 'Please enter a value',
    2: 'An email address must contain a single @',
    3: 'The domain portion of the email address is invalid (the portion after the @: )',
    4: 'The username portion of the email address is invalid (the portion before the @: )',
    5: 'This email address looks fake or invalid. Please enter a real email address'
  };


  // ==========
  // AJAX form
  // ==========
  var jsForm = $('.contact-form');
  var panel = $("body").append("<div class='js-result'></div>").find(".js-result");

  if (jsForm.length) {

    jsForm.each(function(){
      var $form = $(this);

      $form.ajaxForm({
        success: function(json) {
          var jsJSON = JSON.parse(json);
          panel.text(jsJSON.message);

          if (jsJSON.valid) {

            panel[0].classList.add("success");

            setTimeout(function () {
              panel[0].classList.remove("success");
              $form.clearForm();
            }, 3000);

          } else {

            panel[0].classList.add("error");

            setTimeout(function () {
              panel[0].classList.remove("error");
            }, 4500);
          }
        }
      });

    });
  }


  // ==========
  // Video 
  // ==========
  var video = $('.video-section');

  if (video.length) {
    var videoItem = video.find('.video');

    video.on("click", function(){
      video.toggleClass("video-section-play");
      videoItem.get(0).paused ? videoItem.get(0).play() : videoItem.get(0).pause();
    });
  }

  // ==========
  // Responsive Nav
  // ==========
  var responsiveNav = new Navigation({
    initClass: "nav",
    mobileClass: "nav-mobile",
    desktopClass: "nav-desktop",
    checkHeight: false,
    stuck: true,
    stuckOffset: 1,
    onePage: true,
    onePageOffset: 100
  });

  // ==========
  // Magnific Popup
  // ==========
  var lightbox = $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]');
  var lightboxGallery = $('[data-lightbox^="gallery"]');

  if (lightbox.length) {
    lightbox.each(function(){
      var item = $(this);
      item.magnificPopup({
        type: item.data("lightbox")
      });
    });
  }
  if (lightboxGallery.length) {
    lightboxGallery.each(function(){
      $(this).magnificPopup({
        delegate: '[data-lightbox]',
        type: "image",
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function(element) {
            return element.find('img');
          }
        }
      });
    });
  }

  /* Magnific Popup modal window */
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  // =======
  // Parallalx.js
  // =======
  var parallax = $('.parallax-bg');
  if (parallax.length ) {
    if(bstype === 'firefox'|| bstype === "internet-explorer"){
      parallax.each(function(){
        $(this).css({"background": "url(" + $(this).data("image-src") + ")", "background-size":'cover'});
      });
    }
  }

  // =======
  // Popover
  // =======
  var popOver = $('[data-toggle="popover"]');

  if (popOver.length) {
    popOver.popover({
      placement: 'auto',
      trigger: 'hover focus'
    });
  }

  // =======
  // Slick Carousel
  // =======
  var slickCarousel = $('.slick');

  if (slickCarousel.length) {
    slickCarousel.slick({
      centerMode: false,
      centerPadding: '0px',
      autoplay: true,
      focusOnSelect: true,
      pauseOnHover: false,
      swipeToSlide: true,
      infinite: true,
      arrows: false,
      mobileFirst: true,
      variableWidth: false,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: { slidesToShow: 2,  }
        },
        {
          breakpoint: 991,
          settings: { slidesToShow: 3, centerMode: true, }
        },
        {
          breakpoint: 1799,
          settings: { slidesToShow: 5, centerMode: true, }
        },
      ]
    });
  }

  // =======
  // Countdown
  // =======
  var countDown = $('.countdown');

  if (countDown.length) {
    countDown.each(function(){
      var item = $(this),
          date = new Date(),
          settings = [],
          time = item[0].getAttribute('data-time'),
          type = item[0].getAttribute('data-type'),
          format = item[0].getAttribute('data-format');
      date.setTime(Date.parse(time)).toLocaleString();
      settings[type] = date;
      settings['format'] = format;
      item.countdown(settings);
    });
  }


  // =======
  // UIToTop
  // =======
  $().UItoTop();
 
  // =======
  // Touch Spin
  // =======
  $(".quantity").TouchSpin();

  // =======
  // Owl carousel
  // =======
   var carousel = $('.owl-carousel');

  $(".owl-1").owlCarousel({
    mouseDrag: false,
    nav: true,
    loop: false,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    autoplay: false,
    dots: carousel.attr("data-dots") === "true",
    items: 1,
  });

  $(".owl-2").owlCarousel({
    items: 7,
    mouseDrag: true,
    nav: carousel.attr("data-nav") === "true",
    loop: true,
    autoplay: true,
    dots: false,
    responsiveClass:true,
    responsive:{
      0:{ items:1, },
      480:{ items:2, },
      768:{ items:3, },
      992:{ items:4, },
      1200: { items:5, },
      1800: { items:6, }
    }
  });


  // =======
  // Step Form
  // =======
  var stepForm = $('.form-box');

  if (stepForm.length){

      var inputs = $('.do-it');
      $('.step-form fieldset:first').fadeIn('slow');
      $('.step-form-1 fieldset:first').fadeIn('slow');
      $('.step-form-2 fieldset:first').fadeIn('slow');
      
      inputs.removeClass('input-error');
      inputs.on('focus', function() {
        $(this).removeClass('input-error');
      });
      
      // next step
      $('.step-form .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.step-form').find('.step-form-step.active');
        var progress_line = $(this).parents('.step-form').find('.step-form-progress-line');
        
        // fields validation
        parent_fieldset.find('.do-it').each(function() {
          if( $(this).val() == "" ) {
            $(this).addClass('input-error');
            next_step = false;
          } else {
            $(this).removeClass('input-error');
          };
        });
        // fields validation
        
        if( next_step ) {
          parent_fieldset.fadeOut(400, function() {
            // change icons
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            // progress bar
            bar_progress(progress_line, 'right');
            // show next step
            $(this).next().fadeIn();
          });
        }
        
      });
      
      // previous step
      $('.step-form .btn-previous').on('click', function() {
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.step-form').find('.step-form-step.active');
        var progress_line = $(this).parents('.step-form').find('.step-form-progress-line');
        
        $(this).parents('fieldset').fadeOut(400, function() {
          // change icons
          current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
          // progress bar
          bar_progress(progress_line, 'left');
          // show previous step
          $(this).prev().fadeIn();
        });
      });
      
      // submit
      $('.step-form').on('submit', function(e) {
        
        // fields validation
        $(this).find('.do-it').each(function() {
          if( $(this).val() == "" ) {
            e.preventDefault();
            $(this).addClass('input-error');
          } else {
            $(this).removeClass('input-error');
          }
        });
      });
  }

  // =======
  // jQuery Count To
  // =======
  var counter = $('.counter');

  if (counter.length) {
    var counterToInit = counter.not(".init");
    $document.on("scroll", function () {
      counterToInit.each(function(){
        var item = $(this);

        if ((!item.hasClass("init")) && (detectElement(item))) {
          item.countTo({
            refreshInterval: 20,
            speed: item.attr("data-speed") || 1000
          });
          item.addClass('init');
        }
      });
      $document.trigger("resize");
    });
    $document.trigger("scroll");
  }

  // =======
  // WOW
  // =======
  if ($html.hasClass('desktop')) { new WOW().init(); }

  // =======
  // Mouseover Parallax
  // =======
  var scenes = document.getElementById('scene');
  var parallaxx = new Parallax(scenes);

});

// =======
// Particles
// =======
var particles = $('#particles-js');

if (particles.length) {
  particlesJS('particles-js',

      {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#fff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#fff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 100,
            "color": "#fff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#137FEC",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      }
  )
};

