$(document).ready(function() {

  initialize();
  $(window).resize(initialize);

  $(window).scroll(function() {
    $('.pane .fade-in').each(function(index) {
      var objBottom = $(this).position().top + $(this).outerHeight();
      var windowBottom = $(window).scrollTop() + $(window).height();

      if( windowBottom > objBottom ){
        $(this).delay(100*index).animate({'opacity': '1'}, 1000);
      }
    });
  });

  //nav links: go to according pane
  // $('.directive li').click(function() {
  //   var type = $(this).attr('id');
  //   $('html, body').animate({
  //     scrollTop: $('.pane.' + type).offset().top - 21
  //   }, 500);
  // });
});



function initialize() {
  // var height = $(window).height();

  //pane heights: set to splash pane dimensions
  // $('.home').css('height', height - 200);
}