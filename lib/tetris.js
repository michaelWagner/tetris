(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  Tetris.NUMROWS = 14;
  Tetris.NUMCOLS = 10;
  Tetris.BACKGROUND_COLOR = 'teal';

  $( ".new-game-button" ).click(function() {
    new Tetris.Game();
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

  Tetris.Game.prototype.nextMoveIsFullOrBottom = function(delta, piece) {
    newPos = piece.position;
    console.log('next: ' + newPos);
    newPos.forEach(function(pos) {
      if (pos[0] > Tetris.NUMROWS) {
        console.log('bottom');
        this.createRandomPiece();
        return true;
      }
      else if (this.positionFilled(pos)) {
        console.log('filled');
        this.createRandomPiece();
        return true;
      }
      // return (!this.positionFilled(pos) && (pos[0] < Tetris.NUMROWS));
    }.bind(this));
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
    // var positionFilled = false;
    var instances = 0;

    for (var i = 0; i < this.piecesOnBoard.length; i++) {
      for (var j = 0; j < this.piecesOnBoard[i].position.length; j++) {
        if (this.piecesOnBoard[i].position[j].eq(pos)) {
          instances += 1;
          if (instances > 1) {
            console.log('dont do it');
            return true;
          }
        }
      }
    }
    return false;

    // if (Tetris.getCoord(pos[0], pos[1]).hasClass('filled')) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  Tetris.Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('up',     function(){ that.movePiece(that.currentPiece, 'up'); });
    key('down',   function(){ that.movePiece(that.currentPiece, 'down'); });
    key('left',   function(){ that.movePiece(that.currentPiece, 'left'); });
    key('right',  function(){ that.movePiece(that.currentPiece, 'right'); });
  };

  Tetris.Game.prototype.movePiece = function(piece, direction) {
    var color = piece.color;
    // console.log('init pos: ' + piece.position);
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
    // console.log(this.nextMoveIsFullOrBottom(delta, piece));

    if (!this.nextMoveIsFullOrBottom(delta, piece)) {
      console.log('orig: ' + piece.position);
      for (var i = 0; i < 4; i++) {
        Tetris.getCoord(piece.position[i][0], piece.position[i][1])
          .toggleClass('filled')
          .attr('data-color', '')
          .css('background-color', Tetris.BACKGROUND_COLOR);
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
    } else {
      console.log('end pos: ' + piece.position);
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
