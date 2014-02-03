$( document ).ready( function() {
	

	initialize();
	$( window ).resize( initialize );


	/* upon click
	 * - nav links
	 * - back to top button
	 * - nav helper --- */

	//nav links: go to according pane
	$( '.directive li' ).click( function() {

		var type = $( this ).attr( 'id' );

		$( 'html, body' ).animate({
			scrollTop: $( '.pane.' + type ).offset().top - $( 'header' ).height() - 21
		}, 500 );

	});

	//back to top: go to top
	$( '#backTop' ).click( function() {

		$( 'html, body' ).animate({
			scrollTop: $( '.pane.intro' ).offset().top - $( 'header' ).height() - 21
		}, 750 );

	});

	//nav helper: make inactive
	$( '.pane.map .nav-helper' ).click( function() {
		$( this ).addClass('inactive');
	});



	/* upon scroll, adjust
	 * - active pane detector --- */
		 
	$( window ).scroll( function() {

		var pos = $( window ).scrollTop();

		activePane( pos, "intro" );

	});


});



function initialize() {

	var height = $( window ).height();

	//pane heights: set to viewport dimensions
	$( '.pane' ).css( 'height', height - 66 );
	$( '.pane.contact' ).css( 'height', height - 122 );

	//map dimensions: set to viewport dimensions
	$( '.pane.map iframe' ).attr( 'height', $( '.pane.map' ).height() );
	$( '.pane.map iframe' ).attr( 'width', $( window ).width() );
	
	//textbox position: 1/3 of pane height
	$( '.pane .content' ).each( function() {
		var space = height - $( this ).height();
		$( this ).css( 'top', space/4);
	});

	//back to top: center on pane
	$( '#backTop' ).css( 'bottom', $( '.pane.contact' ).height()/2)
}



//nav links: update depending on scroll
function activePane( pos , pane ) {

	var half = $( window ).height()/2 - 33;
	var panePos = $( ".pane." + pane ).offset().top - 61 + half;

	//BASE CASE
	//pos is in current pane: update activeness
	if ( pos < panePos ) {
		$( ".directive li" ).removeClass( "active" );
		$( ".directive #" + pane ).addClass( "active" );

	//RECURSE
	//else, see if pos is in the next pane
	} else {
		var next = $( ".pane." + pane ).next().attr( "label" );
		activePane( pos, next );
	}

}