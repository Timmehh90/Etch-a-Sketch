// VARIABLES
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");
const label = document.querySelector("#label");
const boardContainer = document.querySelector(".board-container");
const colorPicker = document.querySelector("#color");
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
  boardContainer.innerHTML = "";
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
    boardContainer.appendChild(row);

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
      // Prevents default dragging event from happening, to draw more fluidly
      boardElement.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });
    });
  }
  boardContainer.addEventListener("pointerleave", () => {
    isDrawing = false;
  });
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
  if (darken.checked === true && darkenBoost.checked === true) {
    changeOpacity(e, 0.005);
  } else if (darken.checked === true) {
    changeOpacity(e, 0.001);
  }
}

function colorPickerTool(e) {
  e.target.style.backgroundColor = colorPicker.value;
}

function rainbowTool(e) {
  e.target.style.backgroundColor = `rgb(${returnRandomColor()}, ${returnRandomColor()}, ${returnRandomColor()})`;
}
function eraseTool(e) {
  e.target.style.backgroundColor = "var(--clr-200)";
  e.target.style.opacity = "0.1";
}
function clearBoard() {
  boardContainer.querySelectorAll(".board-element").forEach((boardElement) => {
    boardElement.style.backgroundColor = "var(--clr-200)";
    boardElement.style.opacity = "0.1";
  });
}

function changeOpacity(e, opacityIncrement) {
  // Uses parseFloat to make a number of the opacity of the target so you can calculate with it. Gets target opacity
  let opacity = parseFloat(getComputedStyle(e.target).opacity);
  // Checks if the opacity is a number and below 1
  if (!isNaN(opacity) && opacity < 1) {
    // Adds opacityIncrement to the retreived opacity number
    opacity += opacityIncrement;
    // Changes opacity type to string to set target new opacity
    e.target.style.opacity = opacity.toString();
  }
}

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

clearButton.addEventListener("click", clearBoard);

// Changes boost to go off when darken is unchecked
darken.addEventListener("change", (e) => {
  if (!e.target.checked) {
    darkenBoost.checked = false;
  }
});

// Changes darken to go on when boost is checked
darkenBoost.addEventListener("change", (e) => {
  if (e.target.checked) {
    darken.checked = true;
  }
});

// When you choose a color from the picker, you automatically switch to this tool
colorPicker.addEventListener("change", () => {
  tool = "Color Picker";
  colorPickerToolButton.classList.add("active");
  rainbowToolButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

// Start grid creation
drawBoard();
