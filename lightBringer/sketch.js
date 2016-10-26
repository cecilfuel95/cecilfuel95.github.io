function setup() {
  createCanvas(1000,500);
  background(0);
}

function draw() {
  stroke(255);
  line(500, 250, mouseX, mouseY);
}