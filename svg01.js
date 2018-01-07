// select elements
var elements = document.querySelectorAll('svg .dragpoint');
var svgcanvas = document.querySelector('svg');

console.log(elements)

// add event listeners
document.addEventListener("touchstart", start);
document.addEventListener("mousedown", start);
document.addEventListener("touchmove", move);
document.addEventListener("mousemove", move);
document.addEventListener("mouseup", end);

let pickedEl = null;
var mouseDown = false;

/* redraw all line segs with thicker widths for for easier hover detection */
let lineSegs = document.querySelectorAll('svg .lineseg')

for (let line of lineSegs) {
  var svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line")

  svgLine.setAttribute("class", "lineseghover")
  svgLine.setAttribute("x1", line.getAttribute("x1"))
  svgLine.setAttribute("y1", line.getAttribute("y1"))
  svgLine.setAttribute("x2", line.getAttribute("x2"))
  svgLine.setAttribute("y2", line.getAttribute("y2"))
  svgLine.setAttribute("data", line.getAttribute("id"))

  document.getElementsByTagName('svg')[0].appendChild(svgLine)
}



/* event listener functions */

// on mouse or touch down
function start(e) {
  mouseDown = true
  let targetData = e.target.getAttribute('data')

  if (targetData !== null) {
    let segId = '#' + targetData
    pickedEl = document.querySelector(segId)
    pickedEl.setAttribute('class', 'linesegselected')
  }
}

// on move (when down) refresh line points
function move(e) {
  if (pickedEl !== null) {
    console.log("move")
    // pickedEl.setAttribute("cx", e.clientX)
    // pickedEl.setAttribute("cy", e.clientY)
  }
}

//on mouse or touch up
function end(e) {
  console.log("end")
  // console.log(e.target)
  // console.log("start: ", e.target.getAttribute("id"))
  if (pickedEl !== null) {
    pickedEl.setAttribute('class', 'lineseg')
    pickedEl = null;
  }
  mouseDown = false;
}
