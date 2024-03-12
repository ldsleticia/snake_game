let board = document.getElementById("board");
document.addEventListener("keydown", keyPress);

let [appleX, appleY] = [
  Math.floor(Math.random() * 10),
  Math.floor(Math.random() * 10),
];

let [headX, headY] = [
  Math.floor(Math.random() * 20),
  Math.floor(Math.random() * 20),
];

let snakeBody = 3;
let snakeTrail = [];

const fieldQuantity = 20;
const fieldLength = 20;
const velocity = 1;
const BACKGROUND_COLOR = "black";

var context = board.getContext("2d");
var velX = 0;
var velY = 0;

setInterval(updateFrame, 1000 / 15);

function updateFrame() {
  if (headX === appleX && headY === appleY) {
    snakeBody++;
    appleX = Math.floor(Math.random() * fieldQuantity);
    appleY = Math.floor(Math.random() * fieldQuantity);
  }

  if (headX < 0) {
    headX = fieldQuantity - 1;
  }
  if (headX > fieldQuantity - 1) {
    headX = 0;
  }
  if (headY < 0) {
    headY = fieldQuantity - 1;
  }
  if (headY > fieldQuantity - 1) {
    headY = 0;
  }

  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, board.width, board.height);
  while (snakeTrail.length > snakeBody) {
    snakeTrail.shift();
  }

  context.fillStyle = "red";
  context.fillRect(
    appleX * fieldLength,
    appleY * fieldLength,
    fieldLength,
    fieldLength
  );

  headX += velX;
  headY += velY;

  context.fillStyle = "white";
  for (let initial = 0; initial < snakeTrail.length; initial++) {
    context.fillRect(
      snakeTrail[initial].x * fieldLength,
      snakeTrail[initial].y * fieldLength,
      fieldLength,
      fieldLength
    );

    if (snakeTrail[initial].x == headX && snakeTrail[initial].y == headY) {
      velX = 0;
      velY = 0;
      snakeBody = 3;
    }
  }

  snakeTrail.push({ x: headX, y: headY });
}

function keyPress(event) {
  switch (event.keyCode) {
    case 37:
      velX = -velocity;
      velY = 0;
      break;
    case 38:
      velX = 0;
      velY = -velocity;
      break;
    case 39:
      velX = velocity;
      velY = 0;
      break;
    case 40:
      velX = 0;
      velY = velocity;
      break;
  }
}
