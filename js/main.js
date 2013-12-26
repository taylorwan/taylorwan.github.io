$( document ).ready( function() {
	

	initialize();
	$( window ).resize( initialize );


	//moving a piece
	$( '.piece' ).click( function() {

	});

	$( '#contact' ).click( function() {
		$('.contact').toggleClass('active');
	});

});



function initialize() {

	var height = $( window ).height();
}



//delete piece from given square
function delete( id ) {
	$( '#' + id ).html( '' );
}

function deleteAround( id ) {
	
	//find surrounding rows & cols
	var col = id.charCodeAt(0);
	var curC = String.fromCharCode( col );
	var prevC = String.fromCharCode( col-- );
	var nextC = String.fromCharCode( col++ );
	console.log( curC, prevC, nextC );

	var row = id.charCodeAt(1);
	var curR = String.fromCharCode( row );
	var prevR = String.fromCharCode( row-- );
	var nextR = String.fromCharCode( row++ );
	console.log( curR, prevR, nextR );

	//delete
	delete( '#' + prevC + prevR );
	delete( '#' + prevC + curR );
	delete( '#' + prevC + nextR );
	delete( '#' + curC + prevR );
	delete( '#' + curC + curR );
	delete( '#' + curC + nextR );
	delete( '#' + nextC + prevR );
	delete( '#' + nextC + curR );
	delete( '#' + nextC + nextR );
}