// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");

// Grid Element variable
// const gridElements = document.querySelectorAll(".grid-element");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");

// FUNCTIONS
function createGrid(input) {
  if (input > 0 && input <= 500) {
    for (let i = 0; i < input; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("grid-element");
      sketchContainer.appendChild(pixel);
    }
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach((gridElement) => {
      gridElement.addEventListener("mouseenter", colorOnHover);
      console.log("Event listener added to gridElement");
    });
  }
}
function colorOnHover(event) {
  event.target.style.backgroundColor = "black";
}

// EVENT HANDLERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid(parseInt(inputField.value));
});
