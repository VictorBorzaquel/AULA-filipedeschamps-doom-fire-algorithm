const firePixelsArray = [];
const fireWidth = 40;
const fireHeight = 40;
let nodeSize = 10 + "px";
const numberOfPixels = fireHeight * fireWidth;
const lastLineIndex = numberOfPixels - fireHeight;
let debug = false;
const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];
const btnDebug = document.getElementById("btnDebug");
btnDebug.addEventListener("click", () => {
  debug = !debug;
  debugButton();
});
function debugButton() {
  if (debug) {
    btnDebug.innerHTML = "View Mode";
    nodeSize = 25 + "px";
  } else {
    btnDebug.innerHTML = "Debug Mode";
    nodeSize = 10 + "px";
  }
  renderCSS();
}

function start() {
  createFireDataStructure();
  createFireSource();
  renderFire();
  renderCSS();
  debugButton();

  setInterval(calculateFirePropagation, 50);
}
function createFireDataStructure() {
  while (firePixelsArray.length < numberOfPixels) firePixelsArray.push(0);
  //firePixelsArray.Array(numberOfPixels).fill(0)
}
function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;
      updateFireIntensityPerPixel(pixelIndex);
    }
  }
  renderFire();
}
function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowIndexPixel = currentPixelIndex + fireWidth;
  if (belowIndexPixel >= numberOfPixels) return;

  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowIndexPixel];
  const newFireIntensity = belowPixelFireIntensity - decay;
  firePixelsArray[currentPixelIndex - decay] =
    newFireIntensity < 0 ? 0 : newFireIntensity;
}
function renderFire() {
  let html = "";

  for (let iFire = 0; iFire < numberOfPixels; iFire++) {
    const fireIntensity = firePixelsArray[iFire];
    if (debug) {
      html += `
      <div class="node debug">
        <div class="fireIntensity">${fireIntensity}</div>
        <div class="pixelIndex">${iFire}</div>
      </div>`;
    } else {
      const color = fireColorsPalette[fireIntensity];
      const colorString = `${color.r},${color.g},${color.b}`;
      html += `<div class="node" style="background-color: rgb(${colorString})"></div>`;
    }
  }

  document.querySelector("#fireCanvas").innerHTML = html;
}
function renderCSS() {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`
    #fireCanvas {
      display: grid;
      grid-template-columns: repeat(${fireWidth}, ${nodeSize});
      grid-template-rows: repeat(${fireHeight}, ${nodeSize});
    }
  `);
  document.adoptedStyleSheets = [sheet];
}
function createFireSource() {
  for (let i = 0; i < fireWidth; i++) {
    firePixelsArray[lastLineIndex + i] = 36;
  }
}
start();
