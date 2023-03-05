/* eslint-disable quotes */
let n = 1;
const deckArray = [];
const body = document.querySelector("body");
const hand = document.querySelector("#hand");

function cardDraw() {
  const newCard = document.createElement("div");
  newCard.setAttribute("id", `a${n}`);
  newCard.classList.add("card");
  const text = document.createElement("p");
  [text.textContent] = deckArray;
  newCard.appendChild(text);
  hand.appendChild(newCard);
  deckArray.shift();
  mouseEvents(`a${n}`);
  n += 1;
}

function createDeck() {
  function populateDeck(type, ammount) {
    for (let index = 0; index < ammount; index++) {
      deckArray.push(type);
    }
  }

  populateDeck("terreno", 23);
  populateDeck("criatura", 20);
  populateDeck("instant", 5);
  populateDeck("sorcery", 5);
  populateDeck("enchantment", 7);

  shuffle(deckArray);
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function mouseEvents(id) {
  const element = document.getElementById(id);
  dragElement(document.getElementById(id));

  const draggeable = document.getElementById(id);

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
      if (!element.classList.contains("rotate")) {
        element.style.left = `${element
          .getBoundingClientRect()
          .left.toFixed()}px`;
      }

      document.getElementById(id).style.position = "absolute";

      // element.style.left = `${element
      //   .getBoundingClientRect()
      //   .left.toFixed()}px`;
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
}

createDeck();

cardDraw();
cardDraw();
