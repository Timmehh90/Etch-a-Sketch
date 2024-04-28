// VARIABLES
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");
const label = document.querySelector("#label");
const drawBoardContainer = document.querySelector(".draw-board-container");
const currentColorPickerColor = document.querySelector("#color");
const colorPickerToolButton = document.querySelector("#color-picker");
const rainbowToolButton = document.querySelector("#rainbow");
const eraseButton = document.querySelector("#erase");
const clearButton = document.querySelector("#clear");
const activeTool = document.querySelector("#active-tool");
const darken = document.querySelector("#darken");
const darkenBoost = document.querySelector("#darken-boost");

let tool = "Color Picker";

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
  drawBoardContainer.innerHTML = "";
  // Gets board size from CSS variable so javascript stays responsive if i want to change the size.
  const boardSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--board-size")
  );
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < gridSize; j++) {
      const column = document.createElement("div");
      column.classList.add("board-element");
      column.style.width = boardSize / gridSize + "px";
      column.style.height = boardSize / gridSize + "px";
      row.appendChild(column);
    }
    drawBoardContainer.appendChild(row);

    // Adds event listeners to each created board element
    const boardElements = document.querySelectorAll(".board-element");
    boardElements.forEach((boardElement) => {
      boardElement.addEventListener("pointerdown", () => {
        console.log("Pointer down event triggered");
        boardElement.addEventListener("pointermove", (e) => {
          draw(e);
          console.log("Pointer move event triggered");
        });
      });
    });
  }
}

// Tools
function draw(e) {
  if (tool === "Color Picker") {
    colorPickerTool(e);
  }
}

function colorPickerTool(e) {
  e.target.style.backgroundColor = currentColorPickerColor.value;
}

function rainbowTool() {}
function eraseTool() {}
function clearBoard() {}
function changeOpacity() {}

// Utility
function returnRandomColor() {
  return Math.floor(Math.random() * 256);
}

function showErrorOnLabel() {
  label.innerHTML = `You must choose between <span class="accent">1 - 100</span>`;
  setTimeout(() => {
    label.innerHTML = `Create a grid between <span class="accent">1x1</span> and <span class="accent">100x100</span>`;
  }, 5000);
}

// EVENT LISTENERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  drawBoard(checkUserInput(inputField.value));
});

// Start grid creation
drawBoard();
