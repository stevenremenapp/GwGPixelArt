// -------- VARIABLES

//https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/

// Select color input
let colorInput = document.querySelector('#colorPicker');


// Select the updated chosen color
let selectedColor = colorInput.value;

//Select the h1
let title = document.querySelector('h1');

//Dynamically set the value of the color picker outline!!!
colorInput.addEventListener('input', function() {
  colorInput.style.setProperty('outline', '3px solid' + colorInput.value);
  title.style.setProperty('color', colorInput.value);
});



// Select table
let pixelGrid = document.querySelector('#pixelCanvas');

// Select specific cells
// let cell = pixelGrid.querySelectorAll('td');

// Select the Submit button
let submitGrid = document.querySelector('#submitGrid');

//Select the Grid size form
let gridSizeForm = document.querySelector('#sizePicker');

// Select the eraser
let eraser = document.querySelector('#eraser');

let eraserOff = document.querySelector('#eraserOff');

// Boolean to check for dragging
let mouseDown = false;

// -------- FUNCTIONS

document.addEventListener('mousedown', function() {
  mouseDown = true;
});

document.addEventListener('mouseup', function() {
  mouseDown = false;
});

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
      // add event listener to each created td
      // column.addEventListener('click', changeCellColor);
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


// Update background color of td's when CLICKING them
// HAVE TO USE EVENT DELEGATION BECAUSE TD'S ARE DYNAMICALLY GENERATED
//Probably could just add a class to all newly created squares?
pixelGrid.addEventListener('click', function(e) {
  if (e.target && e.target.matches('td')) {
    console.log('td clicked!');
    e.target.style.background = selectedColor;
  }
});

// Update background color of td's when DRAGGING through them
// mousedown, mouseup, mousemove
pixelGrid.addEventListener('mouseover', function(e) {
  if ((e.target && e.target.matches('td')) && (mouseDown)) {
    e.target.style.background = selectedColor;
  };
});

// function colorCell() {
//   e.target.style.background = selectedColor;
// }
//
// function colorGrid() {
//   cell.forEach(function(e) {
//     cell.addEventListener('click', colorCell);
//     cell.addEventListener('mouseover', function(f) {
//       if(mouseDown) {
//         colorCell(f);
//       }
//     })
//   })
// }



// -------- EVENT LISTENERS

//upon submission of form run makeGrid() allowing for prevention of default reload action
gridSizeForm.addEventListener('submit', function(e) {
  makeGrid(e);
});

// Update the selectedColor when using color picker
colorInput.addEventListener('input', updateColor);

// Update the selected color to white when clicking eraser
eraser.addEventListener('click', function(e) {
  selectedColor = 'transparent';
});

eraserOff.addEventListener('click', function() {
  selectedColor = colorInput.value;
});

bomb.addEventListener('click', function() {
  let cell = pixelGrid.querySelectorAll('td');
  // if (e.target && e.target.matches('td')) {
  //   e.target.style.removeProperty('background');
  // }
  for (i = 0; i < cell.length; i++) {
    cell[i].style.removeProperty('background');
  }
});
