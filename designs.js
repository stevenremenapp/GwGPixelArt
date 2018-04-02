// -------- VARIABLES

// Select color input
let colorInput = document.querySelector('#colorPicker');

// Select the updated chosen color
let selectedColor = colorInput.value;

// Select table
let pixelGrid = document.querySelector('#pixelCanvas');

// Select specific cells
let cell = document.querySelectorAll('td');

// Select the Submit button
let submitGrid = document.querySelector('#submitGrid');

//Select the Grid size form
let gridSizeForm = document.querySelector('#sizePicker');

// -------- FUNCTIONS

// When size is submitted by the user, call makeGrid()
function makeGrid(e) {

  // Prevent automatic/normal reload upon submission
  e.preventDefault();

  // Clear current table (by removing tbody)
  document.querySelector("tbody").remove();

  // Select size inputs
  let gridHeight = document.querySelector('#inputHeight').value;
  let gridWidth = document.querySelector('#inputWidth').value;

  //create new tbody element to be used later
  let tableBody = document.createElement("tbody");

  //access gridHeight according to input
  for (let i = 0; i < gridHeight; i++) {
    //create one tr for each number input
    //console.log('add row to table');
    let row = document.createElement("tr");
    //access gridWidth according to input
    for (let j = 0; j < gridWidth; j++) {
      //create one td for each number input
      //console.log('add column to table');
      let column = document.createElement("td");
      //append each created td to each created tr
      row.appendChild(column);
      //append that creation to the created tbody
      tableBody.appendChild(row);
    };

    //append created tbody to table
    pixelGrid.appendChild(tableBody);

    // let newTable = pixelGrid.appendChild(tableBody);
    // tableBody = pixelGrid.replaceChild(newTable, tableBody);
  };
};

// Update the selectedColor data when using color picker
function updateColor() {
  selectedColor = colorInput.value;
}


// -------- EVENT LISTENERS

//upon submission of form run makeGrid() allowing for prevention of default reload action
gridSizeForm.addEventListener('submit', function(e) {
  makeGrid(e);
});

// Update the selectedColor when using color picker
colorInput.addEventListener('change', updateColor);

// Update background color of cell when clicked

cell.addEventListener('click', function() {
  cell.style.backgroundColor = selectedColor;
});
