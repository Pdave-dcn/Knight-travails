document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("chessboard");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if ((i + j) % 2 == 0) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
      }

      // Add number to the square
      const number = document.createElement("div");
      number.classList.add("number");
      number.textContent = (7 - i) * 8 + j + 1;
      square.appendChild(number);

      board.appendChild(square);
    }
  }

  const knightPosition = 56;
  const knightSquare = board.children[knightPosition];
  knightSquare.classList.add("knight");

  console.log("Number of moves: ", knightMoves([0, 0], [, 5]));
});

function knightMoves(start, target) {
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const isValid = (x, y) => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  const queue = [];
  queue.push([...start, 0]);

  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [x, y, numberOfMoves] = queue.shift();

    if (x === target[0] && y === target[1]) return numberOfMoves;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newPosition = [newX, newY];

      if (isValid(newX, newY) && !visited.has(newPosition.toString())) {
        visited.add(newPosition.toString());
        queue.push([newX, newY, numberOfMoves + 1]);
      }
    }
  }
  return null;
}