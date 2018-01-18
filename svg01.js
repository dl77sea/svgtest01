var svgcanvas = document.querySelector('svg');

// add event listeners
document.addEventListener("touchstart", start);
document.addEventListener("mousedown", start);
document.addEventListener("touchmove", move);
document.addEventListener("mousemove", move);
document.addEventListener("mouseup", end);

let pickedEl = null;
var mouseDown = false;

/* event listener functions */
// on mouse or touch down
function start(e) {
  if (e.target.getAttribute('class') === 'lineseg') {
    mouseDown = true
    let segId = e.target.getAttribute('id')
    pickedEl = document.querySelector('#' + segId)
    pickedEl.setAttribute('class', 'linesegselected')
  }
}

function getSvgPoint(domX, domY) {
  let pt = svgcanvas.createSVGPoint();
  pt.x = domX;
  pt.y = domY;
  let svgP = pt.matrixTransform(svgcanvas.getScreenCTM().inverse())
  return svgP;
}

// on move (when down) refresh line points
function move(e) {
  if (pickedEl !== null) {

    let seg = pickedEl.getAttribute('id');
    let svgPt = getSvgPoint(e.clientX, e.clientY)

    //don't let line be dragged outside viewport
    if (svgPt.x < 0) svgPt.x = 2
    if (svgPt.x > 398) svgPt.x = 398
    if (svgPt.y < 0) svgPt.y = 2
    if (svgPt.y > 398) svgPt.y = 398

    switch (seg) {

      case 'seg0':
        document.querySelector('#' + seg).setAttribute('y1', svgPt.y)
        document.querySelector('#' + seg).setAttribute('y2', svgPt.y)
        document.querySelector('#seg1').setAttribute('y1', svgPt.y)
        document.querySelector('#seg3').setAttribute('y2', svgPt.y)

        document.querySelector('#corner-ul').setAttribute('cy', svgPt.y)
        document.querySelector('#corner-ur').setAttribute('cy', svgPt.y)
        break;

      case 'seg1':
        document.querySelector('#' + seg).setAttribute('x1', svgPt.x)
        document.querySelector('#' + seg).setAttribute('x2', svgPt.x)
        document.querySelector('#seg0').setAttribute('x2', svgPt.x)
        document.querySelector('#seg2').setAttribute('x1', svgPt.x)

        document.querySelector('#corner-ur').setAttribute('cx', svgPt.x)
        document.querySelector('#corner-lr').setAttribute('cx', svgPt.x)
        break;

      case 'seg2':
        document.querySelector('#' + seg).setAttribute('y1', svgPt.y)
        document.querySelector('#' + seg).setAttribute('y2', svgPt.y)
        document.querySelector('#seg1').setAttribute('y2', svgPt.y)
        document.querySelector('#seg3').setAttribute('y1', svgPt.y)

        document.querySelector('#corner-lr').setAttribute('cy', svgPt.y)
        document.querySelector('#corner-ll').setAttribute('cy', svgPt.y)
        break;

      case 'seg3':
        document.querySelector('#' + seg).setAttribute('x1', svgPt.x)
        document.querySelector('#' + seg).setAttribute('x2', svgPt.x)
        document.querySelector('#seg0').setAttribute('x1', svgPt.x)
        document.querySelector('#seg2').setAttribute('x2', svgPt.x)

        document.querySelector('#corner-ll').setAttribute('cx', svgPt.x)
        document.querySelector('#corner-ul').setAttribute('cx', svgPt.x)
        break;

    }
  }
}

//on mouse or touch up
function end(e) {
  if (pickedEl !== null) {
    pickedEl.setAttribute('class', 'lineseg')
    pickedEl = null;
  }
  mouseDown = false;
}
