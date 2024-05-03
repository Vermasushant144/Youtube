$(document).ready(function() {

  // simple rotator
  $(function() {
    $('.rotator-list li:not(:first)').hide();
    $('.rotator-list li').css('position', 'absolute');
    $('.rotator-list li').css('top', '0px');
    $('.rotator-list li').css('left', '0px');
    $('.rotator-list li').each(function() {
      var img = $(this);
      $('<img>').attr('src', $(this).attr('src')).load(function() {
        img.css('margin-left', -this.width / 2 + 'px');
      });
    });
    
    var pause = false;
  
    function fadeNext() {
      $('.rotator-list li').first().fadeOut().appendTo($('.rotator-list'));
      $('.rotator-list li').first().fadeIn();
    }
  
    function doRotate() {
      if(!pause) {
        fadeNext();
      }    
    }
      
    var rotate = setInterval(doRotate, 3000);
  });
  
  $('ul.entries .body span').click(function() {
    var that = $(this).parent('p');
    if ($(that).height() <= 110) {
      $(that).animate({'max-height': '1000px'}, 1000);
      $(this).text('-');
    } else {
      $(that).animate({'max-height': '110px'}, 1000);
      $(this).text('+');
    }
  });
  
  itemSlide();
  activeUser();
    
  $('.ev-voting-launch').on('click', function(event) {  
    if ($('body').hasClass('page-thank-you')) {
      return
    }
    
    event.preventDefault();
    
    $('body').addClass('ev-overlay-open');
    var overlayRel = $(this).attr('rel');
    $('li.' + overlayRel + ' .ev-overlay').addClass('open').fadeIn();
    
    closeOverlay();
    thankYou();
  });
  
  if (window.location.href.indexOf("thank-you") > 1) {
    getResults();
    $('body').addClass('page-thank-you');
  }
}); // end of document ready

// overlay
function closeOverlay() {
  $('.ev-overlay').on('click', function() {
    $(this).removeClass('open').fadeOut();
    $('body').removeClass('ev-overlay-open');
  });
  $('.ev-overlay-content').on('click', function(event) {
    event.stopPropagation();
  });
  $('.ev-vote-cancel').on('click', function() {
    $('.ev-overlay').removeClass('open').fadeOut();
    $('body').removeClass('ev-overlay-open');
  });
}

// voting success
function thankYou() {
  $('.ev-overlay.open .ev-vote').on('click', function() {
    var voteName = $('.ev-overlay.open > .ev-overlay-content > h3 > span').text().replace('?', '');
    var voteId = parseInt($(this).attr('rel'));
    $('.ev-overlay.open > .ev-overlay-content').html('<h3>Thank you for voting for <span>' + voteName + '</span></h3>');
  });
}

// item show
function itemSlide() {
  var pause = false;
  
  if (!$('ul.ev-user > li').hasClass('active')) {
    $('ul.ev-user > li:first-of-type, ul.ev-content > li:first-of-type').addClass('active');
  }
  
  setInterval(function() {
    if (pause) {
      return;
    }
    
    var list = $('.ev-user > li');
    if ($('ul.ev-user > li.active').index() != (list.length - 1)) {
      $('ul.ev-user > li.active').removeClass('active').next().addClass('active');
    } else {
      $('ul.ev-user > li.active').removeClass('active');
      $('ul.ev-user > li:first-of-type, ul.ev-content > li:first-of-type').addClass('active');
    }
    var rel = $('ul.ev-user > li.active .ev-voting-launch').attr('rel');
    $('.ev-content li').removeClass('active');
    $('.ev-content li.' + rel).addClass('active');
  }, 4000);
  
  $('.ev-user, .ev-content').hover(function() {
    pause = true;
  }, function() {
    pause = false;
  });
  
  $('ul.ev-user li').hover(function() {
    var rel = $(this).children('.ev-voting-launch').attr('rel');
    $('.active').removeClass('active');
    $(this).addClass('active');
    
    $('.ev-content li.' + rel).addClass('active');
  }, function() {
    // do nothing off hover.
  });
}

function activeUser() {
  // check active item and set
  if (window.location.hash) {
    var hash = window.location.hash.replace('#', '');
    $('.active').removeClass('active');
    $('.ev-user li.' + hash).addClass('active');
    $('.ev-content li.' + hash).addClass('active');
    $('.ev-user, .ev-content').mouseenter();
  } else {
    return;
  }
}