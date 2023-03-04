// Make the DIV element draggable:

dragElement(document.getElementById("mydiv"));

const draggeable = document.getElementById("mydiv");

let drag = true;
draggeable.addEventListener("mousedown", () => (drag = false));

draggeable.addEventListener("mousemove", () => (drag = true));

draggeable.addEventListener(
  "mouseup",
  () => drag === false && rotateElement(draggeable)
);

function rotateElement(elmnt) {
  if (elmnt.classList.contains("rotate")) {
    elmnt.classList.remove("rotate");
  } else {
    elmnt.classList.add("rotate");
  }
}

function dragElement(elmnt) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
