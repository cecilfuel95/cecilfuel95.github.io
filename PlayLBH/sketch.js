var imgBrockStatic;
var imgBrockJump;
var imgCokeCanLeftFoot;
var imgCokeCanRightFoot;
var imgBackground;
var state = false;
var morph = false;
var footCount = 0;
var movX = 50;
var movY = 399;

function setup() {
  createCanvas(1000,600);
  imgBrockStatic = loadImage("BrockJumpStatic.png");
  imgBrockJump = loadImage("BrockJumpJump.png");
  imgColaCanLeftFoot = loadImage("ColaCanFootLeft.png");
  imgColaCanRightFoot = loadImage("ColaCanFootRight.png");
  imgBackground = loadImage("FrootBg.png");
}

function draw() {
  imageMode(CORNER);
  image(imgBackground);
  if (movY <= 120) {
    morph = true;
  }
  else {
    morph = false;
  }
  if (movX >= width) {
    movX = width;
  }
  else if (movX <= 0) {
    movX = 0;
  }
  if (movY >= height-1) {
    movY = height-1;
  }
  else if (movY <= 0) {
    movY = 0;
  }
  var myBrock = new brock(imgBrockStatic, imgBrockJump, imgColaCanLeftFoot, imgColaCanRightFoot, movX, movY, state);
  if (movY <= 380) {
    state = true;
  }
  else {
    state = false;
  }
  myBrock.state(state, morph, footCount);
  slapSomeTextOnThere(footCount);
}

function brock(imgStand, imgJump, imgLeft, imgRight, posX, posY, jumping) {
  this.x = posX;
  this.y = posY;
  
  this.state = function(jumping, morphed, footCount) {
    var imgUsed;
    if (morphed === true) {
      if (footCount === 0) {
      imgUsed = imgLeft;
      }
      else {
        imgUsed = imgRight;
      }
    }
    else {
      if (jumping === true) {
        imgUsed = imgJump;
      }
      else {
        imgUsed = imgStand;
      }
    }
    imageMode(CENTER);
    image(imgUsed, this.x, this.y);
  }
}

function keyPressed() {
  if (footCount === 0) {
    footCount++;
  }
  else {
    footCount--;
  }
  if (keyCode === RIGHT_ARROW) {
    movX = movX+50;
  }
  else if (keyCode ===LEFT_ARROW) {
    movX = movX-50;
  }
  if (keyCode === UP_ARROW) {
    movY = movY-50;
  }
  else if (keyCode === DOWN_ARROW) {
    movY = movY+50;
  }
}

function slapSomeTextOnThere (tempCol) {
  textSize(56);
  if (tempCol === 0) {
    fill('orange');
  }
  else {
    fill('green');
  }
  text("Play Lunch Box Hero! Coming Soon!", 50, 200);
}