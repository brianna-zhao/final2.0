let grid;
let cellSize = 80;
let selected = false;
let selectedX, selectedY;
let matchFound = false;
let catImage; 

function preload() {
  catImage = loadImage('catpage1.png'); 
  winImage = loadImage('cat2.png'); 
}



function setup() {
  createCanvas(240, 240);
  initializeGrid();
}

function initializeGrid() {
  grid = [
    ['G', 'B', 'R'],
    ['G', 'B', 'R'],
    ['R', 'G', 'B']
  ];

  let colors = ['R', 'G', 'B'];
  for (let i = 0; i < 3; i++) {
    grid[i].push(colors[i]);
    grid[i].push(colors[i]);
  }
  grid[2].push(catImage);
  grid[2].push(catImage);
}

function draw() {
  background(255);
  displayGrid();

  if (matchFound) {
    displayWinMessage();
  }
}

function displayGrid() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let x = col * cellSize;
      let y = row * cellSize;
      if (grid[row][col] === catImage) {
        image(catImage, x, y, cellSize, cellSize);
      } else {
        let cellColor = colorForCell(grid[row][col]);
        fill(cellColor);
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

function colorForCell(cell) {
  if (cell === 'G') {
    return color(0, 255, 0); 
  } else if (cell === 'B') {
    return color(0, 0, 255); 
  } else if (cell === 'R') {
    return color(255, 0, 0); 
  }
}

function displayWinMessage() {
  image(winImage, 0, 0, width, height);
}

function mouseClicked() {
  if (!matchFound) { 
    let col = floor(mouseX / cellSize);
    let row = floor(mouseY / cellSize);

    if (!selected) {
      selectedX = col;
      selectedY = row;
      selected = true;
    } else {
      if ((abs(row - selectedY) === 1 && col === selectedX) || (abs(col - selectedX) === 1 && row === selectedY)) {
        swapCells(selectedY, selectedX, row, col);
        selected = false;
      } else {
        selectedX = col;
        selectedY = row;
      }
    }
  }
}

function swapCells(row1, col1, row2, col2) {
  let temp = grid[row1][col1];
  grid[row1][col1] = grid[row2][col2];
  grid[row2][col2] = temp;

  if (checkMatches()) {
    matchFound = true;
  }
}

function checkMatches() {
  matchFound = false;
  for (let row = 0; row < 3; row++) {
    if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
      matchFound = true;
    }
  }

  for (let col = 0; col < 3; col++) {
    if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
      matchFound = true;
    }
  }

  return matchFound;
}