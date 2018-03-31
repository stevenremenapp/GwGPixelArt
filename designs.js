// Select color input
let colorInput = document.querySelector('#colorPicker');

// Select the selected color

let selectedColor = colorInput.value;



// Select table

let pixelGrid = document.querySelector('#pixelCanvas');

// Select the Submit button

let submitGrid = document.querySelector('#submitGrid');

// When size is submitted by the user, call makeGrid()

function makeGrid() {

  // Select size inputs

  let gridHeight = document.querySelector('#inputHeight').value;
  let gridWidth = document.querySelector('#inputWidth').value;

  //access gridHeight according to input
  for (let row = 0; row < gridHeight; row++) {
    //perform action correct number of times -- add click listener to each cell for color
    console.log('add row to table');
    //access gridWidth according to input
    for (let column = 0; column < gridWidth; column++) {
      //perform action correct number of times
      console.log('add column to table');
    };
  };

}

submitGrid.addEventListener('click', makeGrid);
