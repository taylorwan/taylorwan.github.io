$(function(){

	initialize();
	$( window ).resize(initialize);

	$( '#scrollDown' ).click( nextPane );
	$( '#scrollUp' ).click( prevPane );
	$( '#backToTop' ).click( backToTop );

	$( '.penultimate' ).click( dissolve );

});

function initialize() {

	var width = $( window ).width();
	var height = $( window ).height();

	//setting pane heights
	$('.pane').css( 'height' , height - 40 );

	
	//video fill frame & center
	var $video = $( '#introVid' );
	var space = height * .25;
	
	//for height > width
	if ( height > width ) {
		space = width * .25;
		
		$video.attr({
			'width' : width - space,
			'height' : height - ( space*2 ) - 40
		});

	//for width > height, var space set during instantialization
	} else {
		$video.attr({
			'width' : width - ( space*2 ),
			'height' : height - space - 40
		});
	}
		$video.css( 'margin-top' , space/2 );

}


function backToTop() {

	//shifting content
	$( '.content' ).css( 'top' , 0 );

	//moving current class & updating accoringly
	$( '.pane.end' ).removeClass( 'current' );
	$( '.pane.inactive' ).removeClass( 'inactive' );
	$( '.pane.intro' ).addClass( 'current' );
	$( '.main' ).attr( 'current' , 'intro' );
}

function nextPane() {

	//shifting content
	var cur = parseInt( $('.content').css('top') );
	var height = $( window ).height() - 40;
	$( '.content' ).css( 'top' , cur - height );

	//moving current class & updating accoringly
	var $cur = $( '.pane.current' );
	var $next = $cur.next();
	if ( $cur != $( '.pane.end' ) ) {
		$next.addClass( 'current' );
		$cur.removeClass( 'current' );
	}
	console.log('next: ',$next);
	$( '.main' ).attr( 'current' , $( '.pane.current' ).attr('id') );


}
// if not at end, move to previous pane
function prevPane() {

	//shifting content
	var cur = parseInt( $('.content').css('top') );
	var height = $( window ).height() - 40;
	$( '.content' ).css( 'top' , cur + height );

	//moving current class & updating accoringly
	var $cur = $( '.pane.current' );
	var $prev = $cur.prev();
	if ( $cur != $( '.pane.intro' ) ) {
		$prev.addClass( 'current' );
		$cur.removeClass( 'current' );
	}
	$( '.main' ).attr( 'current' , $( '.pane.current' ).attr('id') );
}

function dissolve() {
	$( '.penultimate' ).addClass('inactive');
}