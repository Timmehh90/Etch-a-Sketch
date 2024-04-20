// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");

// Pixel for the Sketch
const pixel = document.createElement("div");
pixel.classList.add("pixel");

// FUNCTIONS
function createGrid(input) {
  if (input > 0 && input < 100) {
    for (let i = 0; i < input; i++) {
      sketchContainer.appendChild(pixel);
    }
  }
}

// EVENT HANDLERS

submitButton.addEventListener("click", () => {
  createGrid(inputField.value);
});
