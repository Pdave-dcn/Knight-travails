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
    } else {
      console.log("No valid path");
    }
  }
});

function animateKnightMovement(path) {
  const board = document.getElementById("chessboard");
  if (!board) return console.log("Board don't exist");
  let index = 0;

  const moveStep = () => {
    if (index < path.length) {
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

function getKnightPosition() {
  const knight = document.querySelector(".knight");

  if (!knight) {
    return console.log("Knight don't exist");
  }

  const row = parseInt(knight.dataset.row, 10);
  const col = parseInt(knight.dataset.col, 10);
  const coordinates = [col, row];

  return coordinates;
}

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
  queue.push([...start, 0, []]);

  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const [x, y, numberOfMoves, path] = queue.shift();
    const currentPath = [...path, [x, y]];

    if (x === target[0] && y === target[1]) return currentPath;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newPosition = [newX, newY];

      if (isValid(newX, newY) && !visited.has(newPosition.toString())) {
        visited.add(newPosition.toString());
        queue.push([newX, newY, numberOfMoves + 1, currentPath]);
      }
    }
  }
  return [];
}
