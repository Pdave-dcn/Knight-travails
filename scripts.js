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

      const number = document.createElement("div");
      number.classList.add("number");
      number.textContent = (7 - i) * 8 + j + 1;
      square.appendChild(number);

      square.dataset.row = 7 - i;
      square.dataset.col = j;

      board.appendChild(square);
    }
  }

  const knightPosition = [0, 0];
  const index = getIndexFromCoordinates(knightPosition[0], knightPosition[1]);
  const knightSquare = board.children[index];
  knightSquare.classList.add("knight");
});

document.addEventListener("click", (event) => {
  const square = event.target.closest(".square");
  if (square) {
    const [x, y] = getKnightPosition();
    const startPos = [x, y];

    const rowY = parseInt(square.dataset.row, 10);
    const colX = parseInt(square.dataset.col, 10);
    const targetPos = [colX, rowY];

    const path = knightMoves(startPos, targetPos);
    if (path && path.length > 0) {
      animateKnightMovement(path);
    }
  }
});

/**
 * Animates the movement of a knight chess piece along a given path on the chessboard.
 * @param {Array<Array<number>>} path - An array of coordinates representing the path for the knight to move.
 * @returns None
 */
function animateKnightMovement(path) {
  const board = document.getElementById("chessboard");
  if (!board) return;
  let index = 0;

  const moveStep = () => {
    if (index < path.length) {
      if (index > 0) {
        const [prevCol, prevRow] = path[index - 1];
        const prevSquareIndex = getIndexFromCoordinates(prevRow, prevCol);
        const prevSquare = board.children[prevSquareIndex];
        prevSquare.classList.add("trace");

        setTimeout(() => prevSquare.classList.remove("trace"), 1000);
      }

      document.querySelector(".knight").classList.remove("knight");

      const [col, row] = path[index];
      const squareIndex = getIndexFromCoordinates(row, col);

      const knightSquare = board.children[squareIndex];
      knightSquare.classList.add("knight");

      index++;
      setTimeout(moveStep, 500);
    }
  };

  moveStep();
}

function getIndexFromCoordinates(row, col) {
  return (7 - row) * 8 + col;
}

/**
 * Retrieves the position of the knight on the chessboard.
 * @returns {number[]} An array containing the column and row coordinates of the knight.
 */
function getKnightPosition() {
  const knight = document.querySelector(".knight");

  if (!knight) {
    return;
  }

  const row = parseInt(knight.dataset.row, 10);
  const col = parseInt(knight.dataset.col, 10);
  const coordinates = [col, row];

  return coordinates;
}

/**
 * Finds the shortest path for a knight on a chessboard from a start position to a target position.
 * @param {number[]} start - The starting position [x, y] on the chessboard.
 * @param {number[]} target - The target position [x, y] on the chessboard.
 * @returns {number[][]} The shortest path from start to target as an array of positions.
 */
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
  queue.push([...start, []]);

  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [x, y, path] = queue.shift();
    const currentPath = [...path, [x, y]];

    if (x === target[0] && y === target[1]) return currentPath;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newPosition = [newX, newY];

      if (isValid(newX, newY) && !visited.has(newPosition.toString())) {
        visited.add(newPosition.toString());
        queue.push([newX, newY, currentPath]);
      }
    }
  }
  return [];
}
