$( document ).ready( function() {
	

	initialize();
	$( window ).resize( initialize );

	//moving a piece
	$( '#move' ).click( moveFromInput );
	//atomic! (blowing up around square)
	$( '#explode' ).click( explode );
	//cheat: insert a piece
	$( '#insert' ).click( insert );
	//cheat: delete a piece
	$( '#deleteSquare' ).click( deleteSquare );
	//reset board
	$( '#reset' ).click( reset );

	//click movement
	$( '.col' ).click( function() {
		var $active = $( '.col.active' );
		var $this = $( this );
		var orig = $active.attr( 'id' );
		var cur = $this.attr( 'id' );
		var thisColor = $this.find( '.piece' ).attr( 'color' );
		var origColor = $active.find( '.piece' ).attr( 'color' );

		//square has piece
		if ( !isEmpty( cur ) ) {

			//same square is clicked
			if ( $this.hasClass( 'active' ) ) {
				$( '.col' ).removeClass( 'active' );
			}
			else {
				//dif piece clicked: if pieces have opposing colors
				if ( thisColor && origColor && thisColor !== origColor ) {
					move( orig, cur );
					$active.removeClass( 'active' );

				//dif piece clicked: if pieces have same colors
				} else {
					$( '.col' ).removeClass( 'active' );
					$this.toggleClass( 'active' );
				}
			}
		}

		//square empty: move a piece to this square
		else if ( $active ) {
			move( orig, cur );
			$active.removeClass( 'active' );
		}
	});

	//toggle contact module
	$( '#contact' ).click( function() {
		$('.contact').toggleClass( 'active' );
	});
	//close contact module
	$( '.contact .exit' ).click( function() {
		$('.contact').removeClass( 'active' );
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
function moveFromInput( event ) {
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

function move( orig , dest ) {
	// if ( !isEmpty( dest ) ) {
		// addCapture( dest );
	// }

	if ( isEmpty( dest ) ) {
		copy( orig , dest );

	//else, capture
	} else {
		deleteAround( dest );
	}
	deleteAt( orig );
	$( '.board[turn="white"]' ).attr( 'turn', 'black' );
	$( '.board[turn="black"]' ).attr( 'turn', 'white' );
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
	$( '#' + id ).html( '<div class="piece ' + color + piece + '" color='+color+'>' + fontVar + '</div>' );
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
	$( '.seven .col' ).html( '<div class="piece black pawn" color="black">o</div>' );
	$( '.two .col' ).html( '<div class="piece white pawn" color="white">p</div>' );
	
	//rooks
	$( '#a8, #h8' ).html( '<div class="piece black rook" color="black">t</div>' );
	$( '#a1, #h1' ).html( '<div class="piece white rook" color="white">r</div>' );

	//knights
	$( '#b8, #g8' ).html( '<div class="piece black knight" color="black">j</div>' );
	$( '#b1, #g1' ).html( '<div class="piece white knight" color="white">h</div>' );

	//bishops
	$( '#c8, #f8' ).html( '<div class="piece black bishop" color="black">n</div>' );
	$( '#c1, #f1' ).html( '<div class="piece white bishop" color="white">b</div>' );

	//queens
	$( '#d8' ).html( '<div class="piece black queen" color="black">w</div>' );
	$( '#d1' ).html( '<div class="piece white queen" color="white">q</div>' );

	//kings
	$( '#e8' ).html( '<div class="piece black king" color="black">l</div>' );
	$( '#e1' ).html( '<div class="piece white king" color="white">k</div>' );
}



