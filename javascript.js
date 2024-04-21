// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");

// Mode variables
let mode = "Black";
const blackModeButton = document.querySelector("#black");
const rainbowModeButton = document.querySelector("#rainbow");
const eraseButton = document.querySelector("#erase");
const clearButton = document.querySelector("#clear");
const activeTool = document.querySelector("#active-tool");
const darken = document.querySelector("#darken");

// FUNCTIONS
function createGrid(input) {
  // Stores CSS variable inside javascript so i can easily edit size by only editing CSS
  const gridSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--grid-size")
  );

  // Resets the grid when function is called
  sketchContainer.innerHTML = "";

  if (input > 0 && input <= 100) {
    for (let i = 0; i < input; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      sketchContainer.appendChild(row);

      for (let j = 0; j < input; j++) {
        const column = document.createElement("div");
        column.classList.add("grid-element");
        // Using --grid-size variable from CSS to make the elements fit within the container
        column.style.width = gridSize / input + "px";
        column.style.height = gridSize / input + "px";
        row.appendChild(column);
      }
    }

    // Goes over each created grid element to add an mouse enter event listener
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach((gridElement) => {
      gridElement.addEventListener("mouseenter", (event) => {
        toolSelection(event, mode);
      });
    });
  } else {
    // Input guidance
    console.log("You must choose between 1 - 100");
  }
}

// Changes background color to black on mouse enter
function toolSelection(event, tool) {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  if (tool === "Black") {
    event.target.style.backgroundColor = "black";
  } else if (tool === "Rainbow") {
    event.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  } else if (tool === "Erase") {
    event.target.style.backgroundColor = "var(--clr-200)";
    event.target.style.opacity = "0.1";
  }

  if (darken.checked === true) {
    changeOpacity(event);
  }
}

function clearGrid() {
  sketchContainer.querySelectorAll(".grid-element").forEach((gridElement) => {
    gridElement.style.backgroundColor = "var(--clr-200)";
    gridElement.style.opacity = "0.1";
  });
}

function changeOpacity(event) {
  let opacity = parseFloat(+getComputedStyle(event.target).opacity);
  console.log(opacity);
  if (!isNaN(opacity) && opacity < 1) {
    opacity += 0.1;
    event.target.style.opacity = opacity.toString();
  }
}

// EVENT LISTENERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid(parseInt(inputField.value));
});

blackModeButton.addEventListener("click", () => {
  mode = "Black";
  activeTool.textContent = `${mode}`;
  blackModeButton.classList.add("active");
  rainbowModeButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

rainbowModeButton.addEventListener("click", () => {
  mode = "Rainbow";
  activeTool.textContent = `${mode}`;
  rainbowModeButton.classList.add("active");
  blackModeButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

eraseButton.addEventListener("click", () => {
  mode = "Erase";
  activeTool.textContent = `${mode}`;
  eraseButton.classList.add("active");
  rainbowModeButton.classList.remove("active");
  blackModeButton.classList.remove("active");
});

clearButton.addEventListener("click", clearGrid);

// Standard grid creation
createGrid(16);

// Initialize current mode
activeTool.textContent = `${mode}`;
blackModeButton.classList.add("active");
