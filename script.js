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
        isDrawing = true;
      });
      boardElement.addEventListener("pointermove", (e) => {
        if (isDrawing) {
          draw(e);
        }
      });
      boardElement.addEventListener("pointerup", () => {
        isDrawing = false;
      });
      boardElement.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    });
  }
}

// Tools
function draw(e) {
  if (tool === "Color Picker") {
    colorPickerTool(e);
  } else if (tool === "Rainbow") {
    rainbowTool(e);
  } else if (tool === "Erase") {
    eraseTool(e);
  }
}

function colorPickerTool(e) {
  e.target.style.backgroundColor = currentColorPickerColor.value;
}

function rainbowTool(e) {
  e.target.style.backgroundColor = `rgb(${returnRandomColor()}, ${returnRandomColor()}, ${returnRandomColor()})`;
}
function eraseTool(e) {
  e.target.style.backgroundColor = "var(--clr-200)";
  e.target.style.opacity = "0.1";
}
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

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  drawBoard(checkUserInput(inputField.value));
});

colorPickerToolButton.addEventListener("click", () => {
  tool = "Color Picker";
  colorPickerToolButton.classList.add("active");
  rainbowToolButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

rainbowToolButton.addEventListener("click", () => {
  tool = "Rainbow";
  rainbowToolButton.classList.add("active");
  colorPickerToolButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

eraseButton.addEventListener("click", () => {
  tool = "Erase";
  eraseButton.classList.add("active");
  colorPickerToolButton.classList.remove("active");
  rainbowToolButton.classList.remove("active");
});

// Start grid creation
drawBoard();
