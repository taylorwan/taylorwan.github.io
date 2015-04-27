$( function() {

	$( '#expandUML' ).click( toggleUML );
	$( '#closeUML' ).click( toggleUML );

});

function toggleUML() {
	console.log( 'clicked! togglin' );
	$( '#bigUML' ).toggleClass( 'hide' );
}