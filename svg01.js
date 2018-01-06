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
svgcanvas.addEventListener("mouseup",  end);

let pickedEl = null;
var mouseDown = false;

// event listener functions

// on mouse or touch down
function start(e) {
  console.log("start: ", e)
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
  console.log(e.target)
  pickedEl = null;
  mouseDown = false;
}
