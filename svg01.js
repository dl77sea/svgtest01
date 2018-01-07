// select elements
var elements = document.querySelectorAll('svg .dragpoint');
var svgcanvas = document.querySelector('svg');

console.log(elements)
// add event listeners
for (let el of elements) {
  el.addEventListener("touchstart", start);
  el.addEventListener("mousedown", start);
}

svgcanvas.addEventListener("touchmove", move);
svgcanvas.addEventListener("mousemove", move);
svgcanvas.addEventListener("mouseup", end);

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

  document.getElementsByTagName('svg')[0].appendChild(svgLine)
}



/* event listener functions */

// on mouse or touch down
function start(e) {
  pickedEl = e.target
  mouseDown = true
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
  console.log("start: ", e.target.getAttribute("id"))
  pickedEl = null;
  mouseDown = false;
}
