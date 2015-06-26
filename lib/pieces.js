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

  Tetris.IPiece = function() {
    this.initialize =  function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[0, 0],  [0, 1],  [0, 2], [0, 3]],
      [[2, -2], [2, -1], [2, 0], [2, 1]],
      [[0, 0],  [0, 1],  [0, 2], [0, 3]],
      [[2, -2], [2, -1], [2, 0], [2, 1]]
    ];
  };

  Tetris.ZPiece = function() {
    // fixed states
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[0, 0], [0, 1], [1, 1], [1, 2]],
      [[2, 0], [1, 1], [1, 0], [0, 1]],
      [[0, 0], [0, 1], [1, 1], [1, 2]],
      [[2, 0], [1, 1], [1, 0], [0, 1]]
    ];
  };

  Tetris.SPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 0], [1, 1], [2, 1]],
    ];
  };

  Tetris.TPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[1, 0], [1, 1], [2, 1], [0, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 0]],
      [[1, 0], [1, 1], [2, 1], [2, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 2]]
    ];
  };

  Tetris.OPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]]
    ];
  };

  Tetris.JPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[1, 0], [1, 1], [1, 2], [0, 2]],
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [2, 0], [1, 1], [1, 2]],
      [[0, 0], [1, 0], [2, 0], [2, 1]]
    ];
  };

  Tetris.LPiece = function() {
    this.initialize = function() {
      this.color = Tetris.getRandomColor();
      this.position = Tetris.setInitialState(this.states);
    };
    this.states = [
      [[0, 0],[0, 1], [0, 2], [1, 2]],
      [[-1, 0], [0, 0], [1, 0], [-1, 1]],
      [[-1, 0], [0, 0], [0, 1], [0, 2]],
      [[-1, 1], [0, 1], [1, 1], [1, 0]]
    ];
  };

  Tetris.getRandomColor = function() {
    var index = Math.floor(Math.random() * (COLORS.length - 1));
    return COLORS[index];
  };

  Tetris.setInitialState = function(states) {
    var index = Math.floor(Math.random() * (states.length - 1));
    return states[index];
  };

  Tetris.PIECES = [
   new Tetris.IPiece(),
   new Tetris.ZPiece(),
   new Tetris.SPiece(),
   new Tetris.TPiece(),
   new Tetris.OPiece(),
   new Tetris.JPiece(),
   new Tetris.LPiece()
 ];
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
