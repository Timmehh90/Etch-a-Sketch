// VARIABLES

// Form selectors
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");
const label = document.querySelector("#label");

// Sketch selectors
const sketchContainer = document.querySelector(".sketch-container");
const colorPickerInput = document.querySelector("#color");

// Button selectors
const colorPickerModeButton = document.querySelector("#color-picker");
const rainbowModeButton = document.querySelector("#rainbow");
const eraseButton = document.querySelector("#erase");
const clearButton = document.querySelector("#clear");
const activeTool = document.querySelector("#active-tool");
const darken = document.querySelector("#darken");
const darkenBoost = document.querySelector("#darken-boost");

// Variables
let mode = "Color Picker";
let isDrawing = false;

// FUNCTIONS

// Gets input from the form and checks for errors
function checkUserInput(input) {
  const gridInput = parseInt(input);
  if (gridInput <= 100) {
    // The value becomes a placeholder, the new value is cleared
    inputField.placeholder = inputField.value;
    inputField.value = "";
    return gridInput;
  } else {
    inputField.value = "";
    showErrorOnLabel();
    return null;
  }
}
function drawBoard(gridSize = 16) {
  // Clear previous board
  sketchContainer.innerHTML = "";
  const boardSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--board-size")
  );
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      const column = document.createElement("div");
      column.classList.add("board-element");
      column.style.width = boardSize / gridSize + "px";
      column.style.height = boardSize / gridSize + "px";
      row.appendChild(column);
    }
    sketchContainer.appendChild(row);
  }
}
// Tools
function colorPickerMode() {}
function rainbowMode() {}
function eraseMode() {}
function clearBoard() {}
function changeOpacity() {}

// Error Messages
function showErrorOnLabel() {
  label.innerHTML = `You must choose between <span class="accent">1 - 100</span>`;
  label.classList.add("label-transition");
  setTimeout(() => {
    label.innerHTML = `Create a grid between <span class="accent">1x1</span> and <span class="accent">100x100</span>`;
    label.classList.remove("label-transition");
  }, 5000);
}

// EVENT LISTENERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  drawBoard(checkUserInput(inputField.value));
});

// Start grid creation
drawBoard();
