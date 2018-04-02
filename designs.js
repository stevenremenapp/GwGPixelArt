// Select color input
let colorInput = document.querySelector('#colorPicker');

// Select the selected color

let selectedColor = colorInput.value;



// Select table

let pixelGrid = document.querySelector('#pixelCanvas');

// Select the Submit button

let submitGrid = document.querySelector('#submitGrid');

//Select the Grid size form

let gridSizeForm = document.querySelector('#sizePicker');

// When size is submitted by the user, call makeGrid()

function makeGrid(e) {

  // Prevent automatic/normal reload upon submission
  e.preventDefault();

  // Clear current table (by removing tr's?)

  document.querySelector("tbody").remove();

  // Select size inputs

  let gridHeight = document.querySelector('#inputHeight').value;
  let gridWidth = document.querySelector('#inputWidth').value;

  //access gridHeight according to input
  for (let i = 0; i < gridHeight; i++) {
    //perform action correct number of times -- add click listener to each cell for color
    console.log('add row to table');
    let row = document.createElement("tr");
    //access gridWidth according to input
    for (let j = 0; j < gridWidth; j++) {
      //perform action correct number of times
      console.log('add column to table');
      let column = document.createElement("td");
      row.appendChild(column);
    };
    let tableBody = document.createElement("tbody");
    tableBody.appendChild(row);
    pixelGrid.appendChild(tableBody);
  };

  // pixelGrid = body.replaceChild(pixelGrid, pixelGrid);

};

gridSizeForm.addEventListener('submit', function(e) {
  makeGrid(e);
});
