// -------- VARIABLES

//https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/

// Select color inputs
let colorInput = document.querySelector('#colorPicker');
let colorBackground = document.querySelector('#colorBackground');
let canvasBackground = document.querySelector('#canvasBackground');
let gridlinesColor = document.querySelector('#gridlinesColor');
let textColor = document.querySelector('#textColor');
let randomColorCheckbox = document.querySelector('#randomColor');


// Select the updated chosen colors
let selectedColor = colorInput.value;
// let selectedBackgroundColor = colorBackground.value;
//let selectedCanvasColor = canvasBackground.value;

// Select table
let pixelGrid = document.querySelector('#pixelCanvas');

//Select the table outlines
let allGridlines = document.querySelectorAll('table, tr, td');

// Select specific cells
// let cell = pixelGrid.querySelectorAll('td');

// Select the Submit button
let submitGrid = document.querySelector('#submitGrid');

//Select the Grid size form
let gridSizeForm = document.querySelector('#sizePicker');

// Select the erasers
let eraser = document.querySelector('#eraser');
let eraserOff = document.querySelector('#eraserOff');
let bomb = document.querySelector('#bomb');
let transparentEraser = document.querySelector('#transparentEraser');
let transparentEraserOff = document.querySelector('#transparentEraserOff');
let transparentBomb = document.querySelector('#transparentBomb');

// Boolean to check for dragging
let mouseDown = false;

// -------- FUNCTIONS

document.addEventListener('mousedown', function() {
  mouseDown = true;
});

// document.addEventListener('touchstart', function() {
//   mouseDown = true;
// });

document.addEventListener('mouseup', function() {
  mouseDown = false;
});

// document.addEventListener('touchend', function() {
//   mouseDown = false;
// });

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
      //allow user to keep canvas color, if chosen
      column.style.setProperty('background', canvasBackground.value);
      //allow user to keep gridlines color, if chosen
      column.style.setProperty('border', '1px solid' + gridlinesColor.value);
      //append each created td to each created tr
      row.appendChild(column);
      //append that creation to the created tbody
      tableBody.appendChild(row);
    };

    //append created tbody to table
    pixelGrid.appendChild(tableBody);

  };
};

// Update the selectedColor data when using color picker
function updateColor() {
  selectedColor = colorInput.value;
  eraser.style.setProperty('background', 'transparent');
  eraserOff.style.setProperty('background', 'pink');
  transparentEraser.style.setProperty('background', 'transparent');
  transparentEraserOff.style.setProperty('background', 'pink');
  randomColorCheckbox.checked = false;
}

function randomColor() {
  eraser.style.setProperty('background', 'transparent');
  eraserOff.style.setProperty('background', 'pink');
  transparentEraser.style.setProperty('background', 'transparent');
  transparentEraserOff.style.setProperty('background', 'pink');
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return selectedColor = color;
};


// Update background color of td's when CLICKING them
// HAVE TO USE EVENT DELEGATION BECAUSE TD'S ARE DYNAMICALLY GENERATED
//Probably could just add a class to all newly created squares?
pixelGrid.addEventListener('click', function(e) {
  if (e.target && e.target.matches('td')) {
    //console.log('td clicked!');
    e.target.style.background = selectedColor;
    e.target.style.transition = 'background 1s';
  }
});

// Update background color of td's when DRAGGING through them
// mousedown, mouseup, mousemove
pixelGrid.addEventListener('mouseover', function(e) {
  if ((e.target && e.target.matches('td')) && (mouseDown)) {
    e.target.style.background = selectedColor;
    e.target.style.transition = 'background 1s';
  };
});

// learned how to do touch and drag from here: https://codepen.io/grahammatt/pen/eVrdYJ?editors=0010 THANK YOUUUU

pixelGrid.addEventListener('touchmove', function(e) {
  // to prevent scrolling while user is touching grid
  e.preventDefault();
  // get the first position touched
  let touch = e.touches[0];
  // grab the current touched position on the screen and call it 'element'
  let element = document.elementFromPoint(touch.clientX, touch.clientY);
  // if the element is a td then color, if not then don't
  if (element.tagName === 'TD') {
    // change the background color
    element.style.background = selectedColor;
  }
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

// Update the selected color to transparent when clicking eraser
eraser.addEventListener('click', function() {
  selectedColor = canvasBackground.value;
  eraser.style.setProperty('background', 'pink');
  eraserOff.style.setProperty('background', 'transparent');
  transparentEraser.style.setProperty('background', 'transparent');
  transparentEraserOff.style.setProperty('background', 'pink');
});

eraserOff.addEventListener('click', function() {
  selectedColor = colorInput.value;
  eraser.style.setProperty('background', 'transparent');
  eraserOff.style.setProperty('background', 'pink');
});

//Need to loop to account for user submitted tables (basically anything larger than the html encoded 10X10 -- or 100 total cells cleared)
bomb.addEventListener('click', function() {
  let cell = pixelGrid.querySelectorAll('td');
  // if (e.target && e.target.matches('td')) {
  //   e.target.style.removeProperty('background');
  // }
  for (i = 0; i < cell.length; i++) {
    cell[i].style.setProperty('background', canvasBackground.value);
    cell[i].style.transition = 'background 2s';
  }
});

transparentEraser.addEventListener('click', function() {
  selectedColor = 'transparent';
  transparentEraser.style.setProperty('background', 'pink');
  transparentEraserOff.style.setProperty('background', 'transparent');
  eraser.style.setProperty('background', 'transparent');
  eraserOff.style.setProperty('background', 'pink');
});

transparentEraserOff.addEventListener('click', function() {
  selectedColor = colorInput.value;
  transparentEraser.style.setProperty('background', 'transparent');
  transparentEraserOff.style.setProperty('background', 'pink');
});

transparentBomb.addEventListener('click', function() {
  let cell = pixelGrid.querySelectorAll('td');
  for (i = 0; i < cell.length; i++) {
    cell[i].style.setProperty('background', 'transparent');
    cell[i].style.transition = 'background 2s';
  }
});

//Dynamically set the value of the color picker outline and title!!!
colorInput.addEventListener('input', function() {
  colorInput.style.setProperty('outline', '3px solid' + selectedColor);
  colorInput.style.transition = 'outline 2s';
  // title.style.setProperty('color', selectedColor);
  // title.style.transition = 'color 2s';
});

randomColorCheckbox.addEventListener('change', function() {
  if (this.checked) {
    console.log('click');
    randomColor();
  } else {
    console.log('unclick');
    updateColor();
  }
});

//Dynamically set the value of the document body background
colorBackground.addEventListener('input', function() {
  // let bodyBackground = document.getElementsByTagName('body');
  document.body.style.setProperty('background', colorBackground.value);
  document.body.style.transition = 'background 2s';
  document.querySelector('#inputHeight').style.setProperty('background', colorBackground.value);
  document.querySelector('#inputWidth').style.setProperty('background', colorBackground.value);
  document.querySelector('#inputHeight').style.transition = 'background 2s';
  document.querySelector('#inputWidth').style.transition = 'background 2s';
  // document.querySelector('#inputHeight').style.backgroundColor = 'colorBackground.value';
  // document.querySelector('#inputWidth').style.backgroundColor = 'colorBackground.value';
});

//Dynamically set the value of the text color
textColor.addEventListener('input', function() {
  textColor.style.outline = '3px solid' + textColor.value;
  textColor.style.transition = 'outline 2s';
  let allText = document.querySelectorAll('h1, h2, span, p');
  for (i = 0; i < allText.length; i++) {
    allText[i].style.color = textColor.value;
    allText[i].style.transition = 'color 2s';
  };
});


//Dynamically set the value of the canvas background
canvasBackground.addEventListener('input', function() {
  canvasBackground.style.setProperty('outline', '3px solid' + canvasBackground.value);
  canvasBackground.style.transition = 'outline 1s';
  // let colorInput = document.querySelector('#colorPicker');
  //removing these already declared variables from this function breaks it for some reason
  let cell = pixelGrid.querySelectorAll('td');
  for (i = 0; i < cell.length; i++) {
    // if (cell[i].style.background.value != colorInput.value) {
    cell[i].style.setProperty('background', canvasBackground.value);
    cell[i].style.transition = 'background 1s';
    // }
  }
});

//Dynamically set the color of the gridlines
gridlinesColor.addEventListener('input', function() {
  gridlinesColor.style.setProperty('outline', '3px solid' + gridlinesColor.value);
  gridlinesColor.style.transition = 'outline 2s';
  //removing these already declared variables from this function breaks it for some reason
  let allGridlines = pixelGrid.querySelectorAll('table, tr, td');
  for (i = 0; i < allGridlines.length; i++) {
    allGridlines[i].style.setProperty('border', '1px solid' + gridlinesColor.value);
    allGridlines[i].style.transition = 'border 1s';
  };
});
