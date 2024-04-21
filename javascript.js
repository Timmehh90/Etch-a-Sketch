// VARIABLES

// Form variables
const inputField = document.querySelector("#amount");
const submitButton = document.querySelector("#submit");

// Sketch container
const sketchContainer = document.querySelector(".sketch-container");

// FUNCTIONS
function createGrid(input) {
  document.documentElement.style.setProperty("--grid-size", input); // Passes grid-size to CSS so i could calculate with it
  sketchContainer.innerHTML = ""; // Resets the grid when function is called
  if (input > 0 && input <= 100) {
    for (let i = 0; i < input; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      sketchContainer.appendChild(row);
      for (let j = 0; j < input; j++) {
        const column = document.createElement("div");
        column.classList.add("grid-element");
        row.appendChild(column);
      }
    }
    // Goes over each created grid element to add an mouse enter event listener
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach((gridElement) => {
      gridElement.addEventListener("mouseenter", colorOnHover);
      gridElement.addEventListener("mouseleave", defaultColor);
    });
  }
}

// Changes background color to black on mouse enter
function colorOnHover(event) {
  event.target.style.backgroundColor = "black";
}

// Changes background color to white on mouse leave
function defaultColor(event) {
  event.target.style.backgroundColor = "white";
}

// EVENT LISTENERS

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid(parseInt(inputField.value));
});

// Standard grid creation
createGrid(16);
