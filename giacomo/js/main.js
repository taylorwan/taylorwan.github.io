$(function(){

	initialize();
	$( window ).resize(initialize);

});

function initialize() {

	var width = $( window ).width();
	var height = $( window ).height();

	$('.pane.intro').css({
		'width' : width,
		'height' : height
	});

	//video fill frame
	var $video = $( '#introVid iframe' );
	$video.attr({
		'width' : width,
		'height' : height
	});

}