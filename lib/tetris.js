(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  Tetris.NUMROWS = 14;
  Tetris.NUMCOLS = 10;
  Tetris.BACKGROUND_COLOR = 'teal';

  $( ".new-game-button" ).click(function() {
    new Tetris.Game();
    $( ".new-game-button" ).prop("disabled",true);
  });

  Tetris.Board = function() {
    for (var x = 0; x < Tetris.NUMROWS; x++) {
      var row = $('<div>').addClass('grid-row');
      for (var y = 0; y < Tetris.NUMCOLS; y++) {
        row.append($('<div>').addClass('grid-sq')
          .attr('data-x', x)
          .attr('data-y', y));
      }
      $('.action-container').append(row);
    }
  };

  Tetris.Game = function() {
    this.piecesOnBoard = [];
    this.currentPiece = {};
    this.board = new Tetris.Board();
    this.bindKeyHandlers();
    this.gameSpeed = 2000;
    this.startGame(this.gameSpeed);
  };

  Tetris.getCoord = function(x, y) {
    return $("div").find("[data-x='" + x + "'][data-y='" + y + "']");
  };

  Tetris.Game.prototype.nextMoveIsUnavailable = function(delta, piece) {
    for (var i = 0; i < piece.position.length; i++) {
      console.log('checkPos: ' + piece.position);
      var posX = piece.position[i][0] + delta[0];
      var posY = piece.position[i][1] + delta[1];
      console.log('[x, y]: ' + [posX, posY])

      if (posX >= Tetris.NUMROWS) {
        this.piecesOnBoard.push(piece);
        this.createRandomPiece();
        console.log(this.piecesOnBoard);
        return true;
      } else if ((posY < 0) || (posY >= Tetris.NUMCOLS)) {
        return true;
      }
      if (this.positionFilled([posX, posY])) {
        if (delta.eq([1, 0])) {
          console.log('filledPos: ' + piece.position);
          this.piecesOnBoard.push(piece);
          this.createRandomPiece();
        }
        console.log(this.piecesOnBoard);
        return true;
      }
    }

    return false;
  };

  Array.prototype.eq = function(otherPos) {
    if (this.length !== otherPos.length) {
      return false;
    } else {
      for (var i = 0; i < this.length; i++) {
        if (this[i] !== otherPos[i]) {
          return false;
        }
      }
    }

    return true;
  };

  Tetris.Game.prototype.startGame = function(gameSpeed) {
    this.createRandomPiece();
    setInterval(function(gameSpeed) {
      this.movePiece(this.currentPiece, 'down');
    }.bind(this), gameSpeed);
  };

  Tetris.Game.prototype.positionFilled = function(pos) {

    for (var i = 0; i < this.piecesOnBoard.length; i++) {
      for (var j = 0; j < this.piecesOnBoard[i].position.length; j++) {
      var instances = 1;
        if (this.piecesOnBoard[i].position[j].eq(pos)) {

          instances += 1;
          // console.log('instances of: ' + instances)
          if (instances > 1) {
            // console.log('dont do it');
          // console.log('instances of: ' + instances)
            return true;
          }
        }
      }
    }

    return false;
  };

  Tetris.Game.prototype.bindKeyHandlers = function() {
    var that = this;
    // key up changes piece state
    key('down',   function(){ that.movePiece(that.currentPiece, 'down'); });
    key('left',   function(){ that.movePiece(that.currentPiece, 'left'); });
    key('right',  function(){ that.movePiece(that.currentPiece, 'right'); });
  };

  Tetris.Game.prototype.movePiece = function(piece, direction) {
    var color = piece.color;
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
    }

    if (!this.nextMoveIsUnavailable(delta, piece)) {
      for (var i = 0; i < 4; i++) {
        Tetris.getCoord(piece.position[i][0], piece.position[i][1])
          .toggleClass('filled')
          .attr('data-color', '')
          .css('background-color', Tetris.BACKGROUND_COLOR);
          piece.position[i][0] += delta[0];
          piece.position[i][1] += delta[1];
      }
    }

      for (var j = 0; j < 4; j++) {
        Tetris.getCoord(piece.position[j][0], piece.position[j][1])
          .toggleClass('filled')
          .attr('data-color', color)
          .css('background-color', color);
      }
    // check if row full
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
    var index = Math.floor(Math.random() * Tetris.PIECES.length);
    var randomPiece = Tetris.PIECES[index];
    randomPiece.initialize();
    randomPiece = this.setStartingLocation(randomPiece);
    // this.piecesOnBoard.push(randomPiece);
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
    // this.piecesOnBoard.push(newPiece);
    this.currentPiece = newPiece;
    return newPiece;
  };

  Tetris.Game.prototype.setStartingLocation = function(piece) {
    var color = piece.color;
    for (var i = 0; i < 4; i++) {
      piece.position[i][0] += 0;
      piece.position[i][1] += (Math.floor(Tetris.NUMCOLS/2.0) - 1);
      // change position to filled and add color
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }
    return piece;
  };
})();

// game = new Tetris.Game();
