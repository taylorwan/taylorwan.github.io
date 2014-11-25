$( document ).ready( function() {
	
	initialize();
	$( window ).resize( initialize );


	/* upon click
	 * - nav links
	 * - back to top button
	 * - nav helper --- */

	//nav links: go to according pane
	$( 'nav li' ).click( function() {

		var type = $( this ).attr( 'id' );

		$( 'html, body' ).animate({
			scrollTop: $( '.pane.' + type ).offset().top - $( 'header' ).height() - 21
		}, 500 );

	});

});



function initialize() {

	var width = $( window ).width();
	var height = $( window ).height();

	//pane heights: set to viewport dimensions
	$( '.pane' ).css( 'height', height - 60 );
}