$( document ).ready( function() {
	

	initialize();
	$( window ).resize( initialize );

	//interactives
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

	//upon click of a piece...
	//click movement
	$( '.square' ).click( function() {

		var $active = $( '.square.active' );
		var $this = $( this );

		var orig = $active.attr( 'id' );
		var cur = $this.attr( 'id' );

		var turn = $( '.board' ).attr( 'turn' );
		var thisColor = $this.find( '.piece' ).attr( 'color' );
		var origColor = $active.find( '.piece' ).attr( 'color' );

		var validMoves = [];

		//square has piece
		if ( !isEmpty( cur ) && ( turn == thisColor || turn == origColor ) ) {

			//same square is clicked
			if ( $this.hasClass( 'active' ) ) {
				$( '.square' ).removeClass( 'active' );
				clearValid();
				console.log("clear valid: same square clicked")
			}
			else {
				//dif piece clicked: if pieces have opposing colors
				if ( thisColor && origColor && thisColor !== origColor && $this.hasClass('valid') ) {
					move( orig, cur );
					$active.removeClass( 'active' );
					clearValid();
					console.log("clear valid: i just took someone's piece");

				//dif piece clicked: if pieces have same colors
				} else {
					// find valid moves
					validMoves = validMove( $this.find( '.piece' ).attr( 'type' ), cur );
					$( '.square' ).removeClass( 'active' );
					$this.toggleClass( 'active' );
					console.log( validMoves );
				}
			}
		}

		//square empty & there is an active square: move a piece to this square
		else if ( $active ) {
			if ( turn == thisColor || turn == origColor && $this.hasClass('valid') ) {
				move( orig, cur );
				$active.removeClass( 'active' );
				clearValid();
				console.log("clear valid: square empty and theres active square")
			}
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
function isValidSquare( id ) {
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

	// turn-taking
	var $board = $( '.board' );
	var turn = $board.attr( 'turn' );
	if ( turn == "white" ) {
		$board.attr( 'turn', 'black' );
	} else {
		$board.attr( 'turn', 'white' );
	}
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
	var colorChar = val.charAt(0);
	var piece = val.substr(1);

	//color of piece
	var color = 'white';
	if ( colorChar == 'B' ) {
		color = 'black';
	}
	//convert to chess font
	var fontVar = 'p';
	if ( piece == "pawn" ) {
		if ( colorChar == 'B' ) { fontVar = 'o'; }
	} else if ( piece == "knight" ) {
		if ( colorChar == 'B' ) { fontVar = 'j'; } else { fontVar = 'h'; }
	} else if ( piece == "bishop" ) {
		if ( colorChar == 'B' ) { fontVar = 'n'; } else { fontVar = 'b'; }
	} else if ( piece == "rook" ) {
		if ( colorChar == 'B' ) { fontVar = 't'; } else { fontVar = 'r'; }
	} else if ( piece == "queen" ) {
		if ( colorChar == 'B' ) { fontVar = 'w'; } else { fontVar = 'q'; }
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

function clearValid() {
	$( '.square.valid' ).removeClass( 'valid' );
}

function addValid( id ) {
	$( '#' + id ).addClass( 'valid' );
}

function testValidPawn( list, id, ifEmpty ) {
	if ( ( isEmpty( id ) && ifEmpty ) ||
		( !isEmpty( id ) && !ifEmpty && (currentTurn() === $('#' + id).attr("color")) ) ) {
		list[list.length] = id;
		addValid( id );
	}
}

function testValid( list, id ) {
	if ((currentTurn() === $('#' + id).attr("color")))
}

function validMove( piece, id ) {

	console.log( "inside validMove with piece " + piece + " and id " + id );
	
	var validSquares = []
	var length = 0;

	var row = parseInt( id[1] );
	var col = id.charCodeAt(0);
	var curC = String.fromCharCode( col );
	var prevC = String.fromCharCode( col - 1 );
	var nextC = String.fromCharCode( col + 1 );
	var prev2C = String.fromCharCode( col - 1 );
	var next2C = String.fromCharCode( col + 1 );

	if ( piece == "pawn" ) {

		// next square
		testValidPawn( validSquares, curC + ( row + forward() ), true );

		// if first move
		if ( row == 2 || row == 7 ) {
			testValidPawn( validSquares, curC + ( row + forward() + forward() ), true );
		}

		//for capturable pieces: left
		testValidPawn( validSquares, prevC + ( row + forward() ), false );

		//for capturable pieces: right
		testValidPawn( validSquares, nextC + ( row + forward() ), false );
	}

	if ( piece == "knight" ) {
		testValid( validSquares, nextC + ( row + forward() + forward() ), false );
		testValid( validSquares, nextC + ( row + forward(false) + forward(false) ), false );
		testValid( validSquares, prevC + ( row + forward() ), false );
		testValid( validSquares, prevC + ( row + forward(false) + forward(false) ), false );
	}

	return validSquares;
}


function currentTurn() {
	return $( '.board' ).attr( 'turn' );
}

function forward( forward ) {
	var color = currentTurn();
	var ret;
	if ( color == "black" )
		ret = -1;
	else if ( color == "white" )
		ret =  1;
	else {
		console.log( "invalid color?!" );
		return 0;
	}

	// backwards instead
	if ( !forward ) {
		ret *= -1;
	}
	return ret;
}


//reset board
function reset( event ) {
	event.preventDefault();

	$( '.board' ).attr( 'turn', 'white' );
	
	$( '.square' ).html( '' );
	$( '.captured .holder' ).html( '' );

	//pawns
	$( '.seven .square' ).html( '<div class="piece black pawn" type="pawn" color="black">o</div>' );
	$( '.two .square' ).html( '<div class="piece white pawn" type="pawn" color="white">p</div>' );
	
	//rooks
	$( '#a8, #h8' ).html( '<div class="piece black rook" type="rook" color="black">t</div>' );
	$( '#a1, #h1' ).html( '<div class="piece white rook" type="rook" color="white">r</div>' );

	//knights
	$( '#b8, #g8' ).html( '<div class="piece black knight" type="knight" color="black">j</div>' );
	$( '#b1, #g1' ).html( '<div class="piece white knight" type="knight" color="white">h</div>' );

	//bishops
	$( '#c8, #f8' ).html( '<div class="piece black bishop" type="bishop" color="black">n</div>' );
	$( '#c1, #f1' ).html( '<div class="piece white bishop" type="bishop" color="white">b</div>' );

	//queens
	$( '#d8' ).html( '<div class="piece black queen" type="queen" color="black">w</div>' );
	$( '#d1' ).html( '<div class="piece white queen" type="queen" color="white">q</div>' );

	//kings
	$( '#e8' ).html( '<div class="piece black king" type="king" color="black">l</div>' );
	$( '#e1' ).html( '<div class="piece white king" type="king" color="white">k</div>' );
}



