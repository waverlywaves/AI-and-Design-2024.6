let circles = []; // Array to store information about each circle
let selectedColorName = ''; // The name of the selected color

let colorSynonyms = {
  pink: ['Blush', 'Rose', 'Fuchsia', 'Salmon', 'Flush'],
  red: ['Crimson', 'Ruby', 'Scarlet', 'Carmine', 'Vermilion', 'Cerise'],
  orange: ['Tangerine', 'Coral', 'Peach', 'Sunset Orange', 'Titian', 'Apricot'],
  yellow: ['Lemon', 'Amber', 'Gold', 'Sunshine', 'Flaxen', 'Aureate'],
  green: ['Emerald', 'Olive', 'Lime', 'Forest Green', 'Sage', 'Chartreuse', 'Mint'],
  teal: ['Turquoise', 'Aquamarine', 'Cyan', 'Cerulean', 'Sapphire', 'Seafoam'],
  blue: ['Azure', 'Cobalt', 'Ultramarine', 'Navy', 'Prussian Blue', 'Peacock Blue'],
  purple: ['Violet', 'Lavender', 'Mauve', 'Magenta', 'Amethyst', 'Periwinkle', 'Grape'],
  black: ['Ebony', 'Jet', 'Onyx', 'Ash', 'Obsidian', 'Ink', 'Twilight', 'Void'],
  white: ['Ivory', 'Snow', 'Pearl', 'Pale', 'Silver', 'Blank', 'Uncolored', 'Chalky']
};

let colorComplements = {
  pink: ['Green'],
  red: ['Green'],
  orange: ['Blue'],
  yellow: ['Purple'],
  green: ['Red'],
  teal: ['Maroon'],
  blue: ['Orange'],
  purple: ['Yellow'],
  black: ['White'],
  white: ['Black']
};

function setup() {
  createCanvas(400, 400);
  background(200); // Off white background

  let colorNames = Object.keys(colorSynonyms);
  let colorValues = colorNames.map(name => color(name));

  let numCols = 5; // Number of columns
  let numRows = 2; // Number of rows
  let circleDiameter = 40; // Diameter of each circle
  let padding = 40; // Padding around the circles

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let x = j * (circleDiameter + padding) + padding;
      let y = i * (circleDiameter + padding) + padding;
      circles.push({
        x: x,
        y: y,
        diameter: circleDiameter,
        color: colorValues[i * numCols + j],
        name: colorNames[i * numCols + j]
      });
    }
  }

  drawCircles(); // Draw the circles
}

function drawCircles() {
  for (let circle of circles) {
    fill(circle.color);
    ellipse(circle.x, circle.y, circle.diameter);
  }
}

function draw() {
  fill(200); // Background color
  noStroke();
  rect(0, height - 100, width, 100); // Background rectangle for text

  if (selectedColorName) {
    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);

    let textMargin = 10;
    let textX = textMargin;
    let textY = height - 95;
    let textWidth = width - 2 * textMargin; // Define maximum width for text

    let compColors = colorComplements[selectedColorName] ? colorComplements[selectedColorName].join(", ") : "N/A";
    let synColors = colorSynonyms[selectedColorName] ? colorSynonyms[selectedColorName].join(", ") : "N/A";

    let compText = "Complementary / Accessible Colors: " + compColors;
    let synText = "Synonyms: " + synColors;

    // Use text wrapping for both lines
    text(compText, textX, textY, textWidth);
    text(synText, textX, textY + 20, textWidth); // Adjust Y position for the second line
  }
}


function mousePressed() {
  for (let circle of circles) {
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    if (d < circle.diameter / 2) {
      selectedColorName = circle.name; // Set the name of the clicked color
      break;
    }
  }
}
