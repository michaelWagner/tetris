(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  Tetris.NUMROWS = 14;
  Tetris.NUMCOLS = 10;
  // Tetris.BACKGROUND_COLOR = '#333';
  Tetris.BACKGROUND_COLOR = '#2F4F4F';

  $( ".new-game-button" ).click(function() {
    new Tetris.Game();
    $( ".new-game-button" ).prop("disabled",true);
  });

  Tetris.Queue = function() {

    for (var x = 0; x < 4; x++) {
      var row = $('<div>').addClass('grid-row');
      for (var y = 0; y < 6; y++) {
        row.append($('<div>').addClass('grid-sq queue')
          .attr('data-queue-x', x)
          .attr('data-queue-y', y));
      }
      $('#piece-queue').append(row);
    }
  }();

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
  }();

  Tetris.getCoord = function(x, y) {
    return $("div").find("[data-x='" + x + "'][data-y='" + y + "']");
  };

  Tetris.Game = function() {
    this.piecesOnBoard = [];
    this.currentPiece = {};
    this.nextPiece = this.createRandomPiece();
    this.bindKeyHandlers();
    this.gameSpeed = 500;
    this.startGame(this.gameSpeed);
    this.score = 0;
  };

  Tetris.Game.prototype.addPieceToQueue = function(piece) {
    $('.queue').css('background-color', '#777');
    var color = piece.color;
    for (var i = 0; i < 4; i++) {
      var $sq = $("div").find("[data-queue-x='" + (piece.position[i][0] + 1) +
                             "'][data-queue-y='" + (piece.position[i][1] + 1) + "']");

      $sq.addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }

    return piece;
  };

  Tetris.Game.prototype.bindKeyHandlers = function() {
    var that = this;
    // key up changes piece state
    key('up',     function() { that.movePiece(that.currentPiece, 'up'); });
    key('down',   function() { that.movePiece(that.currentPiece, 'down'); });
    key('left',   function() { that.movePiece(that.currentPiece, 'left'); });
    key('right',  function() { that.movePiece(that.currentPiece, 'right'); });
  };

  Tetris.Game.prototype.changePieceState = function(piece) {
    var color = piece.color;

    for (var i = 0; i < 4; i++) {
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .removeClass('filled')
        .attr('data-color', '')
        .css('background-color', Tetris.BACKGROUND_COLOR);
    }

    if (piece.currentState === 3) {
      piece.currentState = 0;
    } else {
      piece.currentState += 1;
    }
    piece.position = piece.states[piece.currentState];

    for (var j = 0; j < 4; j++) {
      Tetris.getCoord(piece.position[j][0], piece.position[j][1])
        .addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }
  };

  Tetris.Game.prototype.clearPieceAndUpdatePos = function(piece, delta) {
    for (var i = 0; i < piece.position.length; i++) {
      Tetris.getCoord(piece.position[i][0], piece.position[i][1])
        .removeClass('filled')
        .attr('data-color', '')
        .css('background-color', Tetris.BACKGROUND_COLOR);
      for (var x = 0; x < piece.states.length; x++) {
        piece.states[x][i][0] += delta[0];
        piece.states[x][i][1] += delta[1];
      }
    }

    return piece;
  };

  Tetris.Game.prototype.clearRow = function(row, rowIdx) {
    // clear out row from piecesOnBoard
    this.piecesOnBoard = this.piecesOnBoard.sort(function(a,b) {
      return a.position[0] - b.position[0];
    });

    for (var i = 0; i < this.piecesOnBoard.length; i++) {
      if (this.piecesOnBoard[i].position[0] === rowIdx) {
        this.piecesOnBoard.splice(i, 10);
      }
    }

    // clear out color from row
    row.each(function(x) {
      $(this).removeClass('filled')
        .attr('data-color', '')
        .css('background-color', Tetris.BACKGROUND_COLOR);
    });

    // Add to score
    this.score += 100;
    $('.score').html('Score: ' + this.score);

    // increment piece positions
    for (var j = 0; j < this.piecesOnBoard.length; j++) {
      var piece = this.piecesOnBoard[j];
      Tetris.getCoord(piece.position[0], piece.position[1])
        .removeClass('filled')
        .attr('data-color', '')
        .css('background-color', Tetris.BACKGROUND_COLOR);
      if (piece.position[0] < rowIdx) {
        piece.position[0] += 1;
      }
    }
  };

  Tetris.Game.prototype.clearRowAndDropdown = function() {
    var numRows = 0;
    var startingRow = 0;
    for (var rowIdx = 0; rowIdx < Tetris.NUMROWS; rowIdx++) {
      var numFilledSquares = this.numFilledSquares(rowIdx);

      if (numFilledSquares === Tetris.NUMCOLS) {
        if (rowIdx > startingRow) {
          startingRow = rowIdx;
        }
        numRows += 1;

        this.clearRow(this.getRow(rowIdx), rowIdx);
        this.dropdown(numRows, startingRow);
      }
    }

  };

  Tetris.Game.prototype.dropdown = function(numRows, startingRow) {
    for (var j = 0; j < this.piecesOnBoard.length; j++) {
      var piece = this.piecesOnBoard[j];
      Tetris.getCoord(piece.position[0], piece.position[1])
        .addClass('filled')
        .attr('data-color', piece.color)
        .css('background-color', piece.color);
    }
  };

  Tetris.Game.prototype.createPiece = function(pieceName) {
    var piece;
    switch(pieceName) {
      case 'I':
        piece = new Tetris.IPiece();
        break;
      case 'Z':
        piece = new Tetris.ZPiece();
        break;
      case 'S':
        piece = new Tetris.SPiece();
        break;
      case 'T':
        piece = new Tetris.TPiece();
        break;
      case 'O':
        piece = new Tetris.OPiece();
        break;
      case 'J':
        piece = new Tetris.JPiece();
        break;
      case 'L':
        piece = new Tetris.LPiece();
        break;
    }

    this.nextPiece = piece;
    this.addPieceToQueue(this.nextPiece);

    return piece;
  };

  Tetris.Game.prototype.createRandomPiece = function() {
    var index = Math.floor(Math.random() * Tetris.PIECES.length);
    var randomPiece = this.createPiece(Tetris.PIECES[index]);

    return randomPiece;
  };

  Tetris.Game.prototype.getRow = function(row) {
    return $("div").find("[data-x='" + row + "']");
  };

  Tetris.Game.prototype.movePiece = function(piece, direction) {
    var delta;

    switch(direction) {
      case 'up':
        delta = [0, 0];
        // if (!this.nextMoveIsUnavailable(delta, piece)) {
          this.changePieceState(piece);
        // }
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
      this.clearPieceAndUpdatePos(piece, delta);
    }
    this.render(piece);
    // check if row full
  };

  Tetris.Game.prototype.nextMoveIsUnavailable = function(delta, piece) {
    for (var i = 0; i < piece.position.length; i++) {
      var posX = piece.position[i][0] + delta[0];
      var posY = piece.position[i][1] + delta[1];
      var that = this;

      if (posX >= Tetris.NUMROWS) {
        piece.position.forEach(function(sq) {
          sqPiece = new Tetris.BrokenPiece(sq, piece.color);
          that.piecesOnBoard.push(sqPiece);
        });

        this.currentPiece = this.nextPiece;

        setTimeout(function() {
          this.clearRowAndDropdown();
        }.bind(this), 200);

        this.setStartingLocation(this.currentPiece);
        this.createRandomPiece();

        return true;
      } else if ((posY < 0) || (posY >= Tetris.NUMCOLS)) {
        return true;
      }
      if (this.positionFilled([posX, posY])) {
        if (delta.eq([1, 0])) {
          piece.position.forEach(function(sq) {
            sqPiece = new Tetris.BrokenPiece(sq, piece.color);
            that.piecesOnBoard.push(sqPiece);
          });

          this.currentPiece = this.nextPiece;

          setTimeout(function() {
            this.clearRowAndDropdown();
          }.bind(this), 200);

          this.setStartingLocation(this.currentPiece);
          this.createRandomPiece();
        }

        return true;
      }
    }

    return false;
  };

  Tetris.Game.prototype.nextStateIsUnavailable = function(piece) {
    var nextState;
    if (piece.currentState === 3) {
      nextState = 0;
    } else {
      nextState = piece.currentState + 1;
    }

    for (var i = 0; i < piece.position.length; i++) {
      // console.log(piece.position[i]);
      return this.positionFilled([
        piece.position[i][0] + piece.states[nextState][i][0],
        piece.position[i][1] + piece.states[nextState][i][1]
      ]);
    }
  };

  Tetris.Game.prototype.numFilledSquares = function(rowIdx) {
    var numFilledSquares = 0;
    this.getRow(rowIdx).each(function(x) {
      // this refers to each sq in the row.
      if ($(this).hasClass('filled')) {
        numFilledSquares += 1;
      }
    });

    return numFilledSquares;
  };

  Tetris.Game.prototype.positionFilled = function(pos) {

    for (var i = 0; i < this.piecesOnBoard.length; i++) {
      if (this.piecesOnBoard[i].position.eq(pos)) {
        return true;
      }
    }

    return false;
  };

  Tetris.Game.prototype.render = function(piece) {
    var color = piece.color;

    for (var j = 0; j < piece.position.length; j++) {
      Tetris.getCoord(piece.position[j][0], piece.position[j][1])
        .addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }
  };

  Tetris.Game.prototype.setStartingLocation = function(piece) {
    var color = piece.color;
    for (var j = 0; j < piece.states.length; j++) {
      for (var i = 0; i < 4; i++) {
        piece.states[j][i][0] += 0;
        piece.states[j][i][1] += (Math.floor(Tetris.NUMCOLS/2.0) - 1);
      }
    }

    for (var x = 0; x < piece.position.length; x++) {
      // change position to filled and add color
      Tetris.getCoord(piece.position[x][0], piece.position[x][1])
        .addClass('filled')
        .attr('data-color', color)
        .css('background-color', color);
    }

    return piece;
  };

  Tetris.Game.prototype.startGame = function(gameSpeed) {
    this.currentPiece = this.nextPiece;
    this.createRandomPiece();
    this.setStartingLocation(this.currentPiece);
    setInterval(function(gameSpeed) {
      this.movePiece(this.currentPiece, 'down');
    }.bind(this), gameSpeed);
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

})();
