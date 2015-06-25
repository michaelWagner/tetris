(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  var NUMROWS = 14;
  var NUMCOLS = 10;
  var BACKGROUND_COLOR = 'teal';

  // var piecesOnBoard = [];

  Tetris.Game = function() {
    this.piecesOnBoard = [];
    this.board = new Tetris.Board();
  };

  Tetris.Board = function() {
    for (var x = 0; x < NUMROWS; x++) {
      var row = $('<div>').addClass('grid-row');
      for (var y = 0; y < NUMCOLS; y++) {
        row.append($('<div>').addClass('grid-sq')
          .attr('data-x', x)
          .attr('data-y', y));
      }
      $('.action-container').append(row);
    }
  };

  Tetris.getCoord = function(x, y) {
    return $("div").find("[data-x='" + x + "'][data-y='" + y + "']");
  };

  Tetris.Game.prototype.movePiece = function(piece, direction) {
    var color = piece.color;
    for (var i = 0; i < 4; i++) {
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .toggleClass('filled')
        .attr('data-color', '')
        .css('background-color', BACKGROUND_COLOR);
    }

    // if (direction === 'd') {
      var d = [0, 1];
    // }

    for (var j = 0; j < piece.length; j++) {
      piece[j][0] += d[0];
      piece[j][1] += d[1];
      Tetris.getCoord(piece[j][0], piece[j][1])
        .toggleClass('filled')
        .attr('data-color', color)
        .css('background-color', BACKGROUND_COLOR);
    }
  };

  Tetris.Game.prototype.getInput = function(event) {
    // Call move piece
  };

  Tetris.Game.prototype.positionFilled = function(pos) {
    return pos.hasClass('filled') ? true : false;
  };

  Tetris.Game.prototype.checkIfRowIsFull = function(row) {
    for (var i = 0; i < row.length; i++) {
      if (!this.positionFilled(row[i])) {
        return false;
      }
    }

    return true;
  };

  Tetris.Game.prototype.createRandomPiece = function() {
    // debugger
    var index = Math.floor(Math.random() * (Tetris.PIECES.length - 0 + 1));
    var randomPiece = Tetris.PIECES[index];
    randomPiece.initialize();
    randomPiece = this.setStartingLocation(randomPiece);
    this.piecesOnBoard.push(randomPiece);
    return randomPiece;
  };

  Tetris.Game.prototype.createPiece = function(pieceName) {
    // debugger
    var idx;
    switch(pieceName) {
      case 'I':
        idx = 0;
        break;
      case 'Z':
        idx = 1;
        break;
      case 'S':
        idx = 2;
        break;
      case 'T':
        idx = 3;
        break;
      case 'O':
        idx = 4;
        break;
      case 'J':
        idx = 5;
        break;
      case 'L':
        idx = 6;
        break;
    }

    var newPiece = Tetris.PIECES[idx];
    newPiece.initialize();
    newPiece = this.setStartingLocation(newPiece);
    this.piecesOnBoard.push(newPiece);
    return newPiece;
  };

  Tetris.Game.prototype.setStartingLocation = function(piece) {
    // debugger
    var color = piece.color;
    for (var i = 0; i < 4; i++) {
      piece.position[i][0] += 0;
      piece.position[i][1] += (Math.floor(NUMCOLS/2.0) - 1);
      // change position to filled and add color
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }
    return piece;
  };

  // Build grid.

})();

g = new Tetris.Game();
