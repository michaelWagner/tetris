(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  var NUMROWS = 14;
  var NUMCOLS = 10;
  var BACKGROUND_COLOR = 'teal';

  // var piecesOnBoard = [];

  Tetris.Game = function() {
    this.piecesOnBoard = [];
    this.board = new Tetris.Board();
    this.bindKeyHandlers();
    this.currentPiece = {};
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

  Tetris.Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('up',     function(){ that.movePiece(that.currentPiece, 'up'); });
    key('down',   function(){ that.movePiece(that.currentPiece, 'down'); });
    key('left',   function(){ that.movePiece(that.currentPiece, 'left'); });
    key('right',  function(){ that.movePiece(that.currentPiece, 'right'); });
  };

  Tetris.getCoord = function(x, y) {
    return $("div").find("[data-x='" + x + "'][data-y='" + y + "']");
  };

  Tetris.Game.prototype.movePiece = function(piece, direction) {
    var color = piece.color;
    console.log('init pos: ' + piece.position);
    for (var i = 0; i < 4; i++) {
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .toggleClass('filled')
        .attr('data-color', '')
        .css('background-color', BACKGROUND_COLOR);
    }

    var delta;
    switch(direction) {
      case 'up':
        delta = [0, 0];
        break;
      case 'down':
        delta = [1, 0];
        break;
      case 'left':
        delta = [0, -1];
        break;
      case 'right':
        delta = [0, 1];
        break;
    // if (direction === 'd') {
      // var d = [1, 0];
    }
    // var newPos = piece.position;
    // var piece = piece;
    // var positionFilled = false;

    // for (var x = 0; x < 4; x++) {
    //   newPos[x][0] += delta[0];
    //   newPos[x][1] += delta[1];
    //   if (this.positionFilled(Tetris.getCoord(newPos[x][0], newPos[x][1]))) {
    //     console.log('true');
    //     positionFilled = true;
    //   } else {
    //     positionFilled = false;
    //   }
    // }

    for (var j = 0; j < 4; j++) {
      piece.position[j][0] += delta[0];
      piece.position[j][1] += delta[1];
      Tetris.getCoord(piece.position[j][0], piece.position[j][1])
        .toggleClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }
    console.log('end pos: ' + piece.position);

    // check if row full
  };

  Tetris.Game.prototype.positionFilled = function(pos) {
    // TODO - not working
    if (Tetris.getCoord(pos).hasClass('filled')) {
      return true;
    } else {
      return false;
    }
  };

  Tetris.Game.prototype.checkIfRowIsFull = function(row) {
    // TODO - not working
    for (var i = 0; i < row.length; i++) {
      if (!this.positionFilled(row[i])) {
        return false;
      }
    }

    return true;
  };

  Tetris.Game.prototype.createRandomPiece = function() {
    var index = Math.floor(Math.random() * (Tetris.PIECES.length - 0 + 1));
    var randomPiece = Tetris.PIECES[index];
    randomPiece.initialize();
    randomPiece = this.setStartingLocation(randomPiece);
    this.piecesOnBoard.push(randomPiece);
    this.currentPiece = randomPiece;
    return randomPiece;
  };

  Tetris.Game.prototype.createPiece = function(pieceName) {
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
    this.currentPiece = newPiece;
    return newPiece;
  };

  Tetris.Game.prototype.setStartingLocation = function(piece) {
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
})();

g = new Tetris.Game();
