var gameStateStart = true; var gameStatePlay = false; var gameStateEnd = false;
var noColasLeft = false; var noOrangesLeft = false;
var d;
var brock; var energy = 100; var score = 0; var highScore = 0; var lowScore = 0;
var colas; var cola; var oranges; var orange;
var bg; var bg01; var bg02; var bg03; var bgX = 0;
var lbhLogo; var messageReceived = false;
var fric = .75;
var maxSpeed = 25*d;
var canvas;
var takeSnapshot; var snapshotTaken = false;

var lbhFont; var fontReady = false;

function fontRead(){
  fontReady = true;
}

function preload() {
  bg = loadImage("assets/background.png");
  cola = loadImage("assets/cola01N.png");
  orange = loadImage("assets/orange.png");
  lbhLogo = loadImage("assets/lbhLogo.png");
  lbhFont = loadFont("assets/RifficFree-Bold.ttf", fontRead);
}

function setup() {
  canvas = createCanvas((windowHeight*1.92)/1.25, (windowHeight)/1.25);
  d = windowHeight/1250;
  if (fontReady){
    textFont(lbhFont);
  }
  brock = createSprite(300*d, 540*d);
  brock.friction = fric;
  brock.maxSpeed = maxSpeed;
  var brockNorm = brock.addAnimation("normal", "assets/brock02N.png", "assets/brock01N.png", "assets/brock02N.png", "assets/brock01N.png");
  brockNorm.frameDelay = 20;
  var brockPant = brock.addAnimation("panting", "assets/brock11P.png", "assets/brock12P.png", "assets/brock11P.png", "assets/brock12P.png");
  brockPant.frameDelay = 8;
  var brockHurt = brock.addAnimation("hurt", "assets/brock21H.png");
  brockHurt.frameDelay = 8;
  var brockDead = brock.addAnimation("dead", "assets/brock31D.png");
  colas = new Group();
  oranges = new Group();
  takeSnapshot = createButton('Take a Snapshot!');
  takeSnapshot.position(-100, -100);
}

function draw() {
  checkGameState();
  
  if (energy <= 0) {
    brock.changeAnimation("dead");
    energy = 0;
  }
  else if (energy <= 33) {brock.changeAnimation("panting");}
  else {
    brock.changeAnimation("normal");
    if (energy >= 100) {
      energy = 100;
    }
  }
  
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
    
  if(gameStatePlay && brock.overlap(colas) && energy > 0) {
    energy -=1;
    brock.changeAnimation("hurt");
  }
  
  generateColas();
  generateOranges();
  moveBackground();
  drawSprites(colas);
  drawSprites(oranges);
  drawSprite(brock);

  if (gameStateStart) {
    fill(255, 175, 0);
    rect((1920/2-lbhLogo.width/2.2)*d, 10*d, (lbhLogo.width/1.1)*d, (lbhLogo.height/1.1)*d, 10);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(25*d);
    text("The Mini-game! Based off the real game, coming soon!", (1920/2)*d, (875/2)*d);
    textSize(100*d);
    text("Press SPACE to Play!", (1920/2)*d, (1000/2)*d);
    textSize(50*d);
    text("Up and Down Arrows to Move\n Collect the Oranges and avoid the Cola Bad Guys" + 
    "\nDo you have what it takes to be a Lunch Box Hero? \n Prove it! Get the highest score you can!", (1920/2)*d, (1350/2)*d);
    image(lbhLogo, (1920/2-lbhLogo.width/2.4)*d, 25*d, (lbhLogo.width/1.2)*d, (lbhLogo.height/1.2)*d);
    brock.position.x = 300*d;
    brock.position.y = 540*d;
    brock.scale = d;
  }
  else {
    drawStats();
    checkBounds();
  }
}

function checkGameState(){
  if (gameStateStart && (keyIsDown(keyCode = 32))) {
      gameStatePlay = true;
      gameStateStart = false;
      gameStateEnd = false;                       
  }
  else if (gameStatePlay && energy <= 0) {
    gameStateEnd = true;
    gameStatePlay = false;
    gameStateStart = false;
    brock.velocity.y = 0;
  }
  else if (gameStateEnd && noColasLeft && noOrangesLeft && (keyIsDown(keyCode = 32))) {
    gameStatePlay = true;
    gameStateEnd = false;
    gameStateStart = false;
    resetGame();
  }
}

function moveBackground() {
  if (gameStateStart){
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
    if(!gameStateEnd) {
    bgX-=26.8*d;
    }
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
}
 
function drawStats() {
    rect(760*d, 100*d, 400*d, 80*d, 10*d);
    if(energy >= 33) {fill('yellow');}
    else {fill('red');}
    if (energy >= 1){rect(760*d, 100*d, 4*energy*d, 80*d, 10*d);}
    fill('white');
    textSize(50*d);
    text('ENERGY', 860*d, 90*d);
    textSize(75*d);
    fill(0,99, 30);
    if(gameStatePlay) {
      text('Score: ' + score, 1410*d, 160*d);
      textSize(30*d);
      text('(Best: ' + highScore + ')', 1510*d, 200*d);
      if (lowScore !== 0 && highScore !== 0 && lowScore !== highScore && messageReceived) {
        text('(Worst: ' + lowScore + ')', 1510*d, 240*d);
      }
    }
    if(gameStateEnd) {
      textAlign(CENTER,CENTER);
      textSize(125*d);
      fill(0,214, 64);
      text('Score: ' + score, 960*d, 500*d);
      textSize(50*d);
      endMessage();
      takeSnapshot.position(810*d, 888.9*d);
      takeSnapshot.mousePressed(snapShot);
    }
      if (score <= 5000) {energy-=.01;}
      else if (score <= 15000) {energy-=.02;}
      else if (score <= 45000) {energy-=.04;}
      else {energy-=.08;}
    if(gameStatePlay && frameCount%5 === 0) {
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
   if (gameStatePlay && frameCount%(int)(random(0, 180)) === 0){
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
  if(colas.length === 0) {
    noColasLeft = true;
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
    if(gameStatePlay && oranges[i].overlap(brock)) {
      energy +=1; 
      score += 35;
      oranges[i].remove();
    }
    else if(oranges[i].position.x <= -100*d) {
      oranges[i].remove();
    }
  }
  if(oranges.length === 0) {
    noOrangesLeft = true;
  }
}
 
function endMessage() {
  if (score < 150 && lowScore >= 150) {
    messageReceived = true;
    text("Wait, are you serious?\nWow, that's.... impressively bad, actually." + 
    "\nWell done, I guess? \n Press SPACE reclaim your dignity!", (1920/2)*d, (1400/2)*d);
  }
  else if (score < lowScore) {
    messageReceived = true;
    text("Wow, that's your worst score yet!\n You are a TRUE Lunch Box... Hero?" + 
    "\n...no wait, that's horrible. But can you be even worse? \n Press SPACE and beat your Worst Score to find out!", (1920/2)*d, (1400/2)*d);
  }
  else if (score > highScore && highScore !== 0) {
    text("High score?! More like HIGH FIVE AM I RITE!!\n You are a TRUE Lunch Box Hero!" + 
    "\n...but can you be even Lunch Box Hero-er? \n Press SPACE and beat your High Score to find out!", (1920/2)*d, (1400/2)*d);
  }
  else {
    text("Don't give up, Brock the Broccoli!\n We believe in you!" + 
    "\nPress SPACE to Try Again \n Keep fighting the \"food\" fight!", (1920/2)*d, (1400/2)*d);
  }
}

function resetGame() {
  noColasLeft = false;
  noOrangesLeft = false;
  brock.position.y = 540*d;
  energy = 100;
  if (score > highScore) {
    highScore = score;
  }
  if (lowScore === 0 || score < lowScore) {
    lowScore = score;
  }
  score = 0;
  takeSnapshot.position(-100, -100);
  snapshotTaken = false;
}

function snapShot() {
  takeSnapshot.position(-100, -100);
  textSize(30*d);
  fill(0,99, 30);
  var tempScore = 0;
  if(score > highScore){tempScore = score;}
  else{tempScore = highScore;}
  text('(Best: ' + tempScore + ')', 1510*d, 200*d);
  if (lowScore !== 0 && highScore !== 0 && lowScore !== highScore && messageReceived) {
    if (score < lowScore) {tempScore = score;}
    else{tempScore = lowScore;}
    text('(Worst: ' + tempScore + ')', 1510*d, 240*d);
  }
  noStroke()
  fill(255, 175, 0);
  rect((1920/2-lbhLogo.width/2.2)*d, 10*d, (lbhLogo.width/1.1)*d, (lbhLogo.height/1.1)*d, 10);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(25*d);
  text("The Mini-game! Based off the real game, coming soon!", (1920/2)*d, (875/2)*d);
  text("Created by Eric Kevin Cecil"+
  "\nSpecial thanks to Catalina Von Wrangel, Jose Guzman Fierro, Brandon Wilson,"+
  "\nProfs. Clay Ewing and Zeven Rodriguez, and the University of Miami."+
  "\n[]_[]", 960*d, 930*d);
  image(lbhLogo, (1920/2-lbhLogo.width/2.4)*d, 25*d, (lbhLogo.width/1.2)*d, (lbhLogo.height/1.2)*d);
  if(!snapshotTaken) {
    save(canvas, 'playLunchBoxHero_' + year()+month()+day()+'_'+hour()+' '+minute()+'_'+second()+'.png');
    snapshotTaken = true;
  }
  textAlign(LEFT, BASELINE);
}
