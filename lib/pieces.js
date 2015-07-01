(function() {
  var Tetris = this.Tetris = (this.Tetris || {});

  var COLORS = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange'
  ];

  Tetris.PIECES = ['I', 'Z', 'S', 'T', 'O', 'J', 'L'];

  Tetris.IPiece = function() {
    this.initialize =  function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'IPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[0, 0],  [0, 1],  [0, 2], [0, 3]],
      [[-2, 2], [-1, 2], [0, 2], [1, 2]],
      [[0, 0],  [0, 1],  [0, 2], [0, 3]],
      [[-2, 2], [-1, 2], [0, 2], [1, 2]]
    ];
    this.initialize();
  };

  Tetris.ZPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'ZPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[0, 0], [0, 1], [1, 1], [1, 2]],
      [[2, 0], [1, 1], [1, 0], [0, 1]],
      [[0, 0], [0, 1], [1, 1], [1, 2]],
      [[2, 0], [1, 1], [1, 0], [0, 1]]
    ];
    this.initialize();
  };

  Tetris.SPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'SPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 0], [1, 1], [2, 1]],
    ];
    this.initialize();
  };

  Tetris.TPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'TPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[1, 0], [1, 1], [2, 1], [0, 1]],
      [[0, 1], [1, 1], [1, 2], [1, 0]],
      [[0, 1], [1, 1], [1, 2], [2, 1]],
      [[1, 0], [1, 1], [2, 1], [1, 2]]
    ];
    this.initialize();
  };

  Tetris.OPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'OPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]]
    ];
    this.initialize();
  };

  Tetris.JPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'JPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[1, 0], [1, 1], [1, 2], [0, 2]],
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [1, 2]],
      [[0, 0], [1, 0], [2, 0], [2, 1]]
    ];
    this.initialize();
  };

  Tetris.LPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.pieceName = 'LPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.position = this.states[this.currentState];
    };
    this.states = [
      [[0, 0],[0, 1], [0, 2], [1, 2]],
      [[-1, 0], [0, 0], [1, 0], [-1, 1]],
      [[-1, 0], [0, 0], [0, 1], [0, 2]],
      [[-1, 1], [0, 1], [1, 1], [1, 0]]
    ];
    this.initialize();
  };

  Tetris.BrokenPiece = function(position, color) {
    this.initialize = function() {
      this.position = position;
      this.pieceName = 'BrokenPiece';
      this.currentState = Tetris.setInitialState(this.states);
      this.color = color;
    };
    this.states = [[0, 0]];
    this.initialize();
  };

  Tetris.getRandomColor = function() {
    var index = Math.floor(Math.random() * (COLORS.length - 1));
    return COLORS[index];
  };

  Tetris.setInitialState = function(states) {
    return Math.floor(Math.random() * (states.length - 1));
  };

})();

/**
Array of possible pieces

iPiece:
  ----,

zPiece:
  __
   --,

sPiece:
   __
  -- ,

tPiece:
   _
  ---,

oPiece:
  __
  --

jPiece:
   -
   -
  --

lPiece:
  -
  -
  --

**/
