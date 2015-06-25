var NUMROWS = 14;
var NUMCOLS = 10;
var BACKGROUND_COLOR = 'teal';
var COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'orange'
];

/**
Array of possible pieces

  ----,

  __
   --,

   __
  -- ,

   _
  ---,

  __
  --

**/

PIECES = [
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[0, 0], [0, 1], [1, 1], [2, 1]],
  [[1, 0], [1, 1], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [2, 1], [0, 1]],
  [[0, 0], [0, 1], [1, 0], [1, 1]]
];


function init() {
  for (var x = 0; x < NUMROWS; x++) {
    var row = $('<div>').addClass('grid-row');
    for (var y = 0; y < NUMCOLS; y++) {
      row.append($('<div>').addClass('grid-sq')
        .attr('data-x', x)
        .attr('data-y', y));
    }
    $('.action-container').append(row);
  }

}

function getCoord(x, y) {
  return $("div").find("[data-x='" + x + "'][data-y='" + y + "']");
}

function movePiece(piece, direction) {
  var color = getCoord(piece[0][0], piece[0][1]).attr('data-color');
  for (var i = 0; i < piece.length; i++) {
    getCoord(piece[i][0], piece[i][1])
      .toggleClass('filled')
      .attr('data-color', '')
      .css('background-color', BACKGROUND_COLOR);
  }

  if (direction === 'd') {
    var d = [0, 1];
  }

  for (var i = 0; i < piece.length; i++) {
    piece[i][0] += d[0];
    piece[i][1] += d[1];
    getCoord(piece[i][0], piece[i][1])
      .toggleClass('filled')
      .attr('data-color', color)
      .css('background-color', BACKGROUND_COLOR);
  }
}

function getInput(event) {
  // Call move piece
}

function positionFilled(pos) {
  return pos.hasClass('filled') ? true : false;
}

function checkIfRowIsFull(row) {
  for (var i = 0; i < row.length; i++) {
    if (!positionFilled(row[i])) {
      return false;
    }
  }

  return true;
}

function createRandomPiece() {
  var index = Math.floor(Math.random() * (PIECES.length - 0 + 1));
  var randomPiece = PIECES[index];
  // console.log(randomPiece);
  randomPiece = setStartingLocation(randomPiece);
  // console.log(randomPiece);
}

function getRandomColor() {
  var index = Math.floor(Math.random() * (COLORS.length - 0 + 1));
  return COLORS[index];
}

function setStartingLocation(piece) {
  var color = getRandomColor()
  for (var i = 0; i < piece.length; i++) {
    piece[i][0] += 0;
    piece[i][1] += (Math.floor(NUMCOLS/2.0) - 1);
    // change position to filled and add color
    getCoord(piece[i][0], piece[i][1])
      .addClass('filled')
      .attr('data-color', color)
      .css('background-color', color);
  }

  return piece;
}

// Build grid.
init();
