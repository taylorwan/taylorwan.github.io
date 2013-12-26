$( document ).ready( function() {
	

	initialize();
	$( window ).resize( initialize );

	//moving a piece
	$( '#move' ).click( move );
	//atomic! (blowing up around square)
	$( '#explode' ).click( explode );
	//cheat: insert a piece
	$( '#insert' ).click( insert );
	//cheat: delete a piece
	$( '#deleteSquare' ).click( deleteSquare );
	//reset board
	$( '#reset' ).click( reset );

	//toggle contact module
	$( '#contact' ).click( function() {
		$('.contact').toggleClass('active');
	});
	//close contact module
	$( '.contact .exit' ).click( function() {
		$('.contact').removeClass('active');
	});

});



function initialize() {
	var height = $( window ).height();
	$( '.main' ).css( 'min-height', height - 122 );
}


//check if square is empty
function isEmpty( id ) {
	return $( '#' + id ).html() == "";
}
//check if square is valid
function isValid( id ) {
	var col = id.charCodeAt(0);
	var row = id.charCodeAt(1);
	if ( col < 'a') {
		return false;
	} else if ( col > 'h' ) {
		return false;
	} else if ( row < '1' ) {
		return false;
	} else if ( row > '8' ) {
		return false;
	}
	return true;
}


//copy piece from given square to new square
function copy( orig , dest ) {
	$( '#' + dest ).html( $( '#' + orig ).html() );
}
//delete piece from given square
function deleteAt( id ) {
	$( '#' + id ).html( '' );
}


function addCapture( id ) {
	var piece = $( '#' + id ).html();

	//move to captured
	if ( $( '#' + id + ' .piece' ).hasClass('white') ) {
		$( '#whiteHolder' ).append( piece );
	} else {
		$( '#blackHolder' ).append( piece );
	}
}


//move piece from given square to new square
function move( event ) {
	event.preventDefault();
	
	//grab ids
	var orig = $( '#orig' ).val();
	var dest = $( '#dest' ).val();

	//if empty, move
	if ( isEmpty( dest ) ) {
		copy( orig , dest );

	//otherwise, capture
	} else {
		deleteAround( dest );
	}
	//delete original square
	deleteAt( orig );

	//clear input
	$( '#orig' ).val( '' );
	$( '#dest' ).val( '' );
}


//delete around a given square
function explode( event ) {
	event.preventDefault();
	
	//delete & clear input
	deleteAround( $( '#explodee' ).val() );
	$( '#explodee' ).val( '' );
}


function deleteAround( id ) {

	//find surrounding rows & cols
	var col = id.charCodeAt(0);
	var curC = String.fromCharCode( col );
	var prevC = String.fromCharCode( col - 1 );
	var nextC = String.fromCharCode( col + 1 );

	var row = id.charCodeAt(1);
	var curR = String.fromCharCode( row );
	var prevR = String.fromCharCode( row - 1 );
	var nextR = String.fromCharCode( row + 1 );
	
	//delete
	if ( curC != 'a' ) {
		addCapture( prevC + prevR );
		deleteAt( prevC + prevR );
		addCapture( prevC + curR );
		deleteAt( prevC + curR );
		addCapture( prevC + nextR );
		deleteAt( prevC + nextR );
	}
	addCapture( curC + prevR );
	deleteAt( curC + prevR );
	addCapture( curC + curR );
	deleteAt( curC + curR );
	addCapture( curC + nextR );
	deleteAt( curC + nextR );
	addCapture( nextC + prevR );
	deleteAt( nextC + prevR );
	addCapture( nextC + curR );
	deleteAt( nextC + curR );
	addCapture( nextC + nextR );
	deleteAt( nextC + nextR );

}

//inserts at a square
function insert( event ) {
	event.preventDefault();
	
	//where to insert
	var id = $( '#insertPlace' ).val();

	//piece to insert
	var val = $( '#insertPiece' ).val();
	var colChar = val.charAt(0);
	var piece = val.substr(1);

	//color of piece
	var color = 'white';
	if ( colChar == 'B' ) {
		color = 'black';
	}
	//convert to chess font
	var fontVar = 'p';
	if ( piece == "pawn" ) {
		if ( colChar == 'B' ) { fontVar = 'o'; }
	} else if ( piece == "knight" ) {
		if ( colChar == 'B' ) { fontVar = 'j'; } else { fontVar = 'h'; }
	} else if ( piece == "bishop" ) {
		if ( colChar == 'B' ) { fontVar = 'n'; } else { fontVar = 'b'; }
	} else if ( piece == "rook" ) {
		if ( colChar == 'B' ) { fontVar = 't'; } else { fontVar = 'r'; }
	} else if ( piece == "queen" ) {
		if ( colChar == 'B' ) { fontVar = 'w'; } else { fontVar = 'q'; }
	}

	//insert & clear
	$( '#' + id ).html( '<div class="piece ' + color + piece + '">' + fontVar + '</div>' );
	$( '#insertPlace' ).val( '' );
	$( '#insertPiece' ).val( 'Wpawn' );

}


//deletes at a square: calls deleteAt
function deleteSquare( event ) {
	event.preventDefault();

	//delete & clear
	deleteAt( $( '#deletee' ).val() );
	$( '#deletee' ).val( '' );
}


//reset board
function reset( event ) {
	event.preventDefault();
	
	$( '.col' ).html( '' );
	$( '.captured .holder' ).html( '' );

	//pawns
	$( '.seven .col' ).html( '<div class="piece black pawn">o</div>' );
	$( '.two .col' ).html( '<div class="piece white pawn">p</div>' );
	
	//rooks
	$( '#a8, #h8' ).html( '<div class="piece black rook">t</div>' );
	$( '#a1, #h1' ).html( '<div class="piece white rook">r</div>' );

	//knights
	$( '#b8, #g8' ).html( '<div class="piece black knight">j</div>' );
	$( '#b1, #g1' ).html( '<div class="piece white knight">h</div>' );

	//bishops
	$( '#c8, #f8' ).html( '<div class="piece black bishop">n</div>' );
	$( '#c1, #f1' ).html( '<div class="piece white bishop">b</div>' );

	//queens
	$( '#d8' ).html( '<div class="piece black queen">w</div>' );
	$( '#d1' ).html( '<div class="piece white queen">q</div>' );

	//kings
	$( '#e8' ).html( '<div class="piece black king">l</div>' );
	$( '#e1' ).html( '<div class="piece white king">k</div>' );
}



