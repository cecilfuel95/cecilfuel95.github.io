var gameStatePlay = false;
var d = .75; var dSlider;

var brock; var energy = 100; var score = 0;

var colas; var cola; var oranges; var orange;

var bg; var bg01; var bg02; var bg03; var bgX = 0;

var fric = .75;
var maxSpeed = 25*d;

function setup() {
  createCanvas(1920, 1000);
  bg = loadImage("assets/background.png");
  cola = loadImage("assets/cola01N.png");
  orange = loadImage("assets/orange.png");
  brock = createSprite(300*d, 540*d);
  brock.friction = fric;
  brock.maxSpeed = maxSpeed;
  brock.setCollider("rect", 1, 1, 1, 1);
  var brockNorm = brock.addAnimation("normal", "assets/brock02N.png", "assets/brock01N.png", "assets/brock02N.png", "assets/brock01N.png");
  brockNorm.frameDelay = 20;
  var brockPant = brock.addAnimation("panting", "assets/brock11P.png", "assets/brock12P.png", "assets/brock11P.png", "assets/brock12P.png");
  brockPant.frameDelay = 8;
  var brockHurt = brock.addAnimation("hurt", "assets/brock21H.png");
  brockHurt.frameDelay = 8;
  var brockDead = brock.addAnimation("dead", "assets/brock31D.png");
  //brock.changeAnimation("normal");
  dSlider = createSlider(50, 100, 75);
  dSlider.position(20, 20);
  colas = new Group();
  oranges = new Group();
}

function draw() {
  if (!gameStatePlay) {
    d = dSlider.value()/100;
    background('white');
  }
  
  if (keyIsDown(keyCode = 32)) {
    gameStatePlay = true;
  }
  if (energy <= 0) {brock.changeAnimation("dead");}
  else if (energy <= 33) {brock.changeAnimation("panting");}
  else {brock.changeAnimation("normal");}
  
  
  if(gameStatePlay && keyIsDown(UP_ARROW)){
    changeFriction(true);
    if (brock.velocity.y >= 0)
      brock.velocity.y -= 1;
    else
      brock.velocity.y -= .5;
  }
  if(gameStatePlay && keyIsDown(DOWN_ARROW)) {
    changeFriction(true);
    if (brock.velocity.y <= 0)
      brock.velocity.y += 1;
    else
      brock.velocity.y += .5;
  }
  if(!keyIsDown(DOWN_ARROW) && !keyIsDown(UP_ARROW))
    changeFriction(false);
  if(abs(brock.velocity.y) <= 0.1)
    brock.velocity.y = 0;
    
  if(brock.overlap(colas) && energy > 0) {
    energy -=1;
    brock.changeAnimation("hurt");
  }
  
  generateColas();
  generateOranges();
    
  moveBackground();
  drawSprites(colas);
  drawSprites(oranges);
  drawSprite(brock);

  if (!gameStatePlay) {
    fill('white');
    textSize(100*d);
    textAlign(CENTER, CENTER);
    text("SPACE to Play", (width/2)*d, (height/2)*d);
    brock.position.x = 300*d;
    brock.position.y = 540*d;
    brock.scale = d;
  }
  else {
    drawStats();
    checkBounds();
  }
}

function moveBackground() {
  if (!gameStatePlay){
    bg01 = image(bg, 0, 0, 1000*d, 1080*d);
    bg02 = image(bg, 1000*d, 0, 1000*d, 1080*d);
    bg03 = image(bg, 2000*d, 0, 1000*d, 1080*d);
    noStroke();
    rect(2000*d, 0, 2000, 1080);
  }
  else {
    bg01 = image(bg, bgX*d, 0, 1000*d, 1080*d);
    bg02 = image(bg, (1000 + bgX)*d, 0, 1000*d, 1080*d);
    bg03 = image(bg, (2000 + bgX)*d, 0, 1000*d, 1080*d);
    noStroke();
    rect((1920*d), 0, 1920, 1080);
    bgX-=26.8*d;
  }
  if (bgX <= -999) {
    bgX = 0;
  }
  
}
 function changeFriction(moving) {
  if (moving === true) 
    brock.friction = 1.1;
  else 
    brock.friction = fric;
  console.log(brock.friction + " " + brock.velocity.y);
 }
 
 function drawStats() {
    rect((width/2-200)*d, 100*d, 400*d, 80*d, 10*d);
    if(energy >= 33) {fill('yellow');}
    else {fill('red');}
    rect((width/2-200)*d, 100*d, 4*energy*d, 80*d, 10*d);
    fill('white');
    textSize(40*d);
    text('ENERGY', (width/2-100)*d, 90*d);
    text('Score: ' + score, (width/2+500)*d, 90*d);
    
    energy-=.01;
    if(frameCount%5 === 0) {
    score++;
    }
 }
 
 function checkBounds() {
   if (brock.position.y <= 300*d){
     brock.position.y = 301*d;
     brock.velocity.y *=-.5;
   }
   else if (brock.position.y >= 930*d){
     brock.position.y = 929*d;
     brock.velocity.y *=-.5;
   }
 }
 
 function generateColas() {
   if (gameStatePlay && frameCount%(int)(random(0, 120)) === 0){
    var thisCola = createSprite(2200*d, d*(random(301, 929)));
    thisCola.scale = d;
    thisCola.setCollider("circle", 0, 0, 20*d);
    thisCola.addImage(cola);
    colas.add(thisCola);
  }
  
  for(var i = 0; i<colas.length; i++) {
    colas[i].position.x -=20*d;
    if(colas[i].position.x <= -100*d) {
      colas[i].remove();
    }
  }
 }
 
  function generateOranges() {
   if (gameStatePlay && frameCount%(int)(random(0, 120)) === 0){
    var thisOrange = createSprite(2200*d, d*(random(301, 929)));
    thisOrange.scale = d;
    thisOrange.setCollider("circle", 0,0,20*d)
    thisOrange.addImage(orange);
    oranges.add(thisOrange);
  }
  
  for(var i = 0; i<oranges.length; i++) {
    oranges[i].position.x -=20*d;
    if(oranges[i].overlap(brock)) {
      energy +=1; 
      score += 20;
      oranges[i].remove();
    }
    else if(oranges[i].position.x <= -100*d) {
      oranges[i].remove();
    }
  }
 }