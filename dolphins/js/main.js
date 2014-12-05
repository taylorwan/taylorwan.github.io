$(function() {

	// init
	initialize();
	$( window ).resize( initialize );


	// loading iframes
    $( '#zoe' ).load( 'zoe.html' );
    $( '#val' ).load( 'val.html' );

    
    // arrow click: move down one pane
    $( '.arrow' ).click( function() {
		$( 'html, body' ).animate({
			scrollTop: $( window ).scrollTop() + $( window ).height()
		}, 650 );
    });


    // initializing each point
    $( '.eq' ).each( function() {

    	// grab magnitude
    	var mag = parseFloat( $( this ).attr( 'mag' ) );

    	// determine colors for each point
    	var color = '';
    	if ( mag > 3.5 ) { color = 'rgb(236, 93, 87)'; } // red
    	else if ( mag > 3 ) { color = 'rgb(253, 164, 15)'; } // orange
    	else if ( mag > 2.5 ) { color = 'rgb(245, 211, 40)'; } // yellow
    	else { color = 'rgb(112, 191, 65)'; } // green

    	// set colors
    	$( this ).attr( 'color', color );
    	$( this ).css( 'box-shadow' , '0 0 9px 1px ' + color + ', #ccc 0px 0px 9px' );
    });



	// on hover
	$( '.eq' ).hover( function() {

		// find magnitude and radius
		var mag = $( this ).attr( 'mag' );
		var rad = mag * mag * mag * mag / 5;

		// color
		var c = $( this ).attr( 'color' );

		// find opaque version of color
    	var opq = 'rgba(' + c.split('(')[1];
    	opq = opq.split(')')[0] + ', .2)';

		// box-shadow value
		var val = '0 0 3px ' + rad + 'px ' + c;
		val += ', 0 0 100px ' + opq + ' inset';

		// set the radius
	    $( this ).css({
	    	'box-shadow' : val,
	    	'z-index' : 20
	    });

	    // find values in side box
	    var date = $( this ).attr( 'date' );
	    var lat = $( this ).attr( 'lat' );
	    var lng = $( this ).attr( 'lng' );

	    // change values in side box
	    $( '#date' ).text( date );
	    $( '#mag' ).text( mag );
	    $( '#lat' ).text( lat + ', ' );
	    $( '#lng' ).text( lng );


	// off hover
	  }, function() {

	  	// change color back
	  	var val = '0 0 9px 1px ' + $( this ).attr( 'color' ) + ', #ccc 0px 0px 9px';
	    $( this ).css({
	    	'box-shadow' : val,
	    	'z-index' : 0
	    });
	  }
	);
});


// initialize
function initialize() {

	// window data
	var height = $( window ).height() - 10;
	var width = $( window ).width();

	// pane heights: set to viewport dimensions
	$( '.pane' ).css( 'height', height );
	
	// setting iframe sizes
	$( '.pane iframe' ).attr( 'height' , height );
	$( '.pane iframe' ).attr( 'width' , width );
}