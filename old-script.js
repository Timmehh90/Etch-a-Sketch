// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");
const label = document.querySelector("#label");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");
const colorPicker = document.querySelector("#color");

// Mode variables
let mode = "Color Picker";

const colorPickerModeButton = document.querySelector("#color-picker");
const rainbowModeButton = document.querySelector("#rainbow");
const eraseButton = document.querySelector("#erase");
const clearButton = document.querySelector("#clear");
const activeTool = document.querySelector("#active-tool");
const darken = document.querySelector("#darken");
const darkenBoost = document.querySelector("#darken-boost");

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
    let isDrawing = false;

    sketchContainer.addEventListener("mousedown", (event) => {
      event.preventDefault();
      isDrawing = true;
    });
    // Goes over each created grid element to add an mouse enter event listener
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach((gridElement) => {
      gridElement.addEventListener("mousemove", (event) => {
        if (isDrawing) {
          toolSelection(event, mode);
        }
      });
    });
    document.addEventListener("mouseup", () => {
      isDrawing = false;
    });
    document.addEventListener("mouseleave", () => {
      isDrawing = false;
    });
  } else {
    // Input guidance
    label.innerHTML = `You must choose between <span class="accent">1 - 100</span>`;
    label.classList.add("label-transition");
    setTimeout(() => {
      label.innerHTML = `Create a grid between <span class="accent">1x1</span> and
          <span class="accent">100x100</span>`;
      label.classList.remove("label-transition");
    }, 5000); // Label changes back after 5 seconds
  }
}

// Changes background color to black on mouse enter
function toolSelection(event, tool) {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  if (tool === "Color Picker") {
    event.target.style.backgroundColor = colorPicker.value;
  } else if (tool === "Rainbow") {
    event.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  } else if (tool === "Erase") {
    event.target.style.backgroundColor = "var(--clr-200)";
    event.target.style.opacity = "0.1";
  }

  // If darken checkbox is checked, increment opacity
  if (darken.checked === true && darkenBoost.checked === true) {
    changeOpacity(event, 0.03);
  } else if (darken.checked === true) {
    changeOpacity(event, 0.01);
  }
}

// Clears the grid and resets opacity
function clearGrid() {
  sketchContainer.querySelectorAll(".grid-element").forEach((gridElement) => {
    gridElement.style.backgroundColor = "var(--clr-200)";
    gridElement.style.opacity = "0.1";
  });
}

// Checks if opacity is below 1 then increment opacity by 0.1
function changeOpacity(event, opacityIncrement) {
  let opacity = parseFloat(getComputedStyle(event.target).opacity);
  if (!isNaN(opacity) && opacity < 1) {
    opacity += opacityIncrement;
    event.target.style.opacity = opacity.toString();
  }
}

// EVENT LISTENERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid(parseInt(inputField.value));
});

colorPickerModeButton.addEventListener("click", () => {
  mode = "Color Picker";
  activeTool.textContent = `${mode}`;
  colorPickerModeButton.classList.add("active");
  rainbowModeButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

rainbowModeButton.addEventListener("click", () => {
  mode = "Rainbow";
  activeTool.textContent = `${mode}`;
  rainbowModeButton.classList.add("active");
  colorPickerModeButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

eraseButton.addEventListener("click", () => {
  mode = "Erase";
  activeTool.textContent = `${mode}`;
  eraseButton.classList.add("active");
  rainbowModeButton.classList.remove("active");
  colorPickerModeButton.classList.remove("active");
});

clearButton.addEventListener("click", clearGrid);

// Changes boost to go off when darken is unchecked
darken.addEventListener("change", (event) => {
  if (!event.target.checked) {
    darkenBoost.checked = false;
  }
});

// Changes darken to go on when boost is checked
darkenBoost.addEventListener("change", (event) => {
  if (event.target.checked) {
    darken.checked = true;
  }
});

colorPicker.addEventListener("change", () => {
  mode = "Color Picker";
  activeTool.textContent = `${mode}`;
  colorPickerModeButton.classList.add("active");
  rainbowModeButton.classList.remove("active");
  eraseButton.classList.remove("active");
});

// Standard grid creation
createGrid(16);

// Initialize current mode
activeTool.textContent = `${mode}`;
colorPickerModeButton.classList.add("active");