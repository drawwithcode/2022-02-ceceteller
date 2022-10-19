let myLetters = ["ㅇ", "ㅜ", "ㅋ", "ㅉ", "ㅹ", "ㅀ", "ㅙ"];
let extraCanvas;
var iterator = 0;
var iterator2 = 0;
var iterator3 = 0;
var iterator4 = 0;
let col = 0;
let myTransp = 0;

var ball;
let bubble1;
let bubble2;
let bubble3;
let bubble4;

let myFont;

function preload() {
  myFont = loadFont("assets/Arial Narrow.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bubble1 = new Bubble();
  bubble2 = new Bubble();
  bubble3 = new Bubble();
  bubble4 = new Bubble();

  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas.clear();
  frameRate(24);

  //definisco la ball per la scritta rimbalzina "no signal"
  ball = {
    ts: 100,
    x: windowWidth / 2,
    y: windowHeight / 2,
    xspeed: 10,
    yspeed: 10,
  };
}

function draw() {
  //sfondo di letterine
  background("#cc0000");

  col = map(mouseX, 0, windowWidth, 0, 255); //variabilità bianco - nero
  myTransp = map(mouseY, 0, windowHeight, 0, 102 * 3); //variabilità alpha

  push();
  translate(frameCount, frameCount);
  for (let a = -(windowWidth * 2); a < windowWidth; a += 25) {
    for (let b = -(windowHeight * 2); b < windowHeight; b += 25) {
      fill(col, myTransp);
      text(random(myLetters), a, b);
      textSize(15);
    }
  }
  pop();

  //m&m's centrali
  fill(0);

  push();
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
  bubble3.move();
  bubble3.show();
  bubble4.move();
  bubble4.show();

  // perlin noise verdi
  iterator++;
  extraCanvas.fill(0, 255, 0, 70);
  extraCanvas.stroke(0, 255, 0, 70);
  let x = iterator;
  let y = (noise(iterator / 50) * width) / 2;
  extraCanvas.ellipse(x, y, 25, 25);

  iterator2++;
  extraCanvas.fill(0, 255, 0, 70);
  extraCanvas.stroke(0, 255, 0, 70);
  let x2 = iterator2;
  let y2 = noise(iterator2 / 100) * width;
  extraCanvas.square(x2, y2, 25, 3);

  iterator3++;
  extraCanvas.fill(0, 255, 0, 70);
  extraCanvas.stroke(0, 255, 0, 70);
  let x3 = iterator3;
  let y3 = noise(iterator3 / 210) * height;
  extraCanvas.ellipse(x3, y3, 20, 20);

  iterator4++;
  extraCanvas.fill(0, 255, 0, 70);
  extraCanvas.stroke(0, 255, 0, 70);
  let x4 = iterator4;
  let y4 = noise(iterator4 / 200) * width;
  extraCanvas.textSize(100);
  extraCanvas.square(x4, y4, 30, 5);

  image(extraCanvas, 0, 0);

  //chiamo testo "no signal" ballerino
  pop();
  display();
  move();
  bounce();

  //indicazioni che si muovono con il testo
  fill(255);
  textSize(25);
  textAlign(CENTER);
  textFont("ArialNarrow");
  text("move 👉🏽 to lighten, move 👆🏼 to hide", pmouseX, pmouseY);
}

//definisco classe m&m's
class Bubble {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(1);
    fill("#cc0000");
    ellipse(this.x, this.y, random(16, 24), random(16, 24));
  }
}
// scritta "no signal" rimbalzina
//la disegno
function display() {
  fill("blue");
  textSize(ball.ts);
  textFont("ArialNarrow");
  text("NO SIGNAL", ball.x - 400, ball.y - 400, ball.x + 400, ball.y + 400);
}
// la vincolo ai margini
function bounce() {
  if (ball.x > windowWidth || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > windowHeight || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}
// le faccio cambiare traiettoria
function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
