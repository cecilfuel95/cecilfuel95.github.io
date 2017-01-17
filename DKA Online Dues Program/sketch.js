var canvas; var snapshotTaken = false;
var intro; var duesContract; var paymentPlan;
var i; var dC; var pP;
var dCButton; var pPButton; var backButton; var enterButton;
var dCChosen = false; var pPChosen = false;
var input;
var pos = 0; var currentPos; var keyCheck = false;

var docStats =[
  ["Please enter your Colony/Chapter name (Hint: Xi Chapter)", "", 200, 170],
  ["Please enter today's date (mm/dd/yyyy)", "", 580, 170],
  ["Please enter your University", "", 200, 198],
  ["Please enter your name", "", 196, 226],
  ["Please enter your address (Home or school address, either is fine)", "", 165, 254],
  ["Please enter your city/state/zip", "", 195, 282],
  ["Please enter your email address", "", 140, 310],
  ["Please re-enter your name", "", 115, 357],
  ["Please enter the total amount (Members $200, Pledges $275)", "", 525, 565],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 620],
  ["Please enter amount", "", 340, 620],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 620],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 642],
  ["Please enter amount", "", 340, 642],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 642],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 664],
  ["Please enter amount", "", 340, 664],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 664],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 686],
  ["Please enter amount", "", 340, 686],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 686],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 708],
  ["Please enter amount", "", 340, 708],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 708],
  ["Please enter payment date (mm/dd/yyyy)", "", 200, 730],
  ["Please enter amount", "", 340, 730],
  ["Please enter balance (a.k.a. how much is left after this payment?)", "", 510, 730],
  ["Please re-enter your name", "", 100, 865],
  ["Please re-enter today's date (mm/dd/yyyy)", "", 500, 863],
  ["Check the above for accuracy and hit ENTER to save a copy of your form", "", 0, 0]];

function preload() {
  intro = loadImage("assets/intro.png");
  duesContract = loadImage("assets/duesContract.png");
  paymentPlan = loadImage("assets/paymentPlan.png");
}

function setup() {
  canvas = createCanvas(850, 1100);
  i = image(intro, 0, 0, 850, 1100);
  dCButton = createButton('Dues Contract');
  dCButton.size(200, 50);
  dCButton.position(150, 400);
  pPButton = createButton('Payment Plan');
  pPButton.size(200, 50);
  pPButton.position(500, 400);
  input = createInput();
  input.position(-100, -100);
  backButton = createButton('Back');
  backButton.position(-100, -100);
  enterButton = createButton('Enter');
  enterButton.position(-100, -100);
}

function draw() {
  snapshotTaken = false;
  dCButton.mousePressed(duesC);
  pPButton.mousePressed(paymentP);
  enterButton.mousePressed(moveForward);
  backButton.mousePressed(moveBackward);
  
  if (dCChosen) {
    dC = image(duesContract, 0, 0, 850, 1100);
    docStats[27][3] = 753;
    docStats[28][3] = 753;
  }
  
  if (pPChosen) {
    pP = image(paymentPlan, 0, 0, 850, 1100);
  }
  
  if(dCChosen || pPChosen) {
    input.position(325, 1000);
    backButton.position(277, 1000);
    enterButton.position(480, 1000);
    for(var x = 0; x<docStats.length; x++) {
      text(docStats[x][1], docStats[x][2], docStats[x][3]);
    }
    currentPos = pos;
    
    if(keyIsDown(keyCode = 13) && !keyCheck) {
      keyCheck = true;
      moveForward();
    }
    if(!keyIsDown(keyCode = 13)) {
      keyCheck = false;
    }
    
    textAlign(CENTER, CENTER);
    textSize(20);
    text(docStats[pos][0], 425, 975);
    posCheck();
    if (pos !== 29) {
      rect(docStats[pos][2]-5, docStats[pos][3]-15, 3, 15);
    }
    docStats[pos][1] = input.value();
    textAlign(LEFT, BASELINE);
    textSize(12);
    
    
  }
}

function duesC() {
  dCChosen = true;
  moveButtons();
}

function paymentP() {
  pPChosen = true;
  moveButtons();
}

function moveForward() {
  if (pos === 29) {
    if (dCChosen) {
      dC = image(duesContract, 0, 0, 850, 1100);
    }
    if (pPChosen) {
      pP = image(paymentPlan, 0, 0, 850, 1100);
    }
    for(var x = 0; x<docStats.length; x++) {
      text(docStats[x][1], docStats[x][2], docStats[x][3]);
    }
    if(!snapshotTaken) {
      save(canvas, 'deltaKappaAlpha_' + docStats[27][1] +'.png');
      snapshotTaken = true;
    }
  }
  else if (pos === currentPos && pos < docStats.length) {
    pos++;
    input.value('');
  }
}

function moveBackward() {
  if (pos === currentPos && pos !== 0) {
    if (pos === 27 && (docStats[10][1] === "200" || docStats[10][1] === "275")) {
      pos = 12;
    }
    pos--;
    input.value(docStats[pos][1]);
  }
}

function moveButtons() {
  dCButton.position(-200, -200);
  pPButton.position(-200, -200); 
}

function posCheck() {
  if (pos === 12 && (docStats[10][1] === "200" || docStats[10][1] === "275")) {
      pos = 27;
  }
  else if (pos === 15 && dCChosen) {
      pos = 27;
  }
}




