// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");

// FUNCTIONS
function createGrid(input) {
  if (input > 0 && input <= 500) {
    for (let i = 0; i < input; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      sketchContainer.appendChild(pixel);
    }
  }
}

// EVENT HANDLERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid(parseInt(inputField.value));
});
