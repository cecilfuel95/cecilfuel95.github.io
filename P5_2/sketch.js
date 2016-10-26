var center = 375;
var halfWidth = 25;
var X = center-halfWidth;
var Y = center-halfWidth;
var eyeX = 0;
var eyeY = 0;
var mapX = 0;
var mapY = 0;
var bill;

function preload() {
  bill = loadImage("bill.png");
}
function setup() {
  createCanvas(2*center, 2*center);
}

function draw() {
  
  mapX = map(mouseX,0,width,-3, +3);
  mapY = map(mouseY,0,height,-3, +3);
  
  if(mouseX>center-halfWidth && mouseX<center+halfWidth && mouseY>center-halfWidth && mouseY<center+halfWidth && mouseIsPressed === true) {
    image(bill, center-halfWidth, center-halfWidth-7.5);
  }
  else{
    fill(255-(mouseY/2),255-(mouseX/2),255-((mouseX-mouseY))/2);
    rect(mouseX,mouseY,mouseX-mouseY,mouseY-mouseX);
    rect(X,Y,2*halfWidth,2*halfWidth);
  
    fill('white');
    ellipse(X+22.5+mapX,Y+15+mapY,10,10); ellipse(X+37.5+mapX,Y+15+mapY,10,10);
    line(X+12.5+(mapX/2),Y+25+(mapY/2),X+22.5+(mapX/2),Y+25+(mapY/2)); rect(X+22.5+(mapX/2),Y+25+(mapY/2),20,20,0,0,10,10); 
  }
  
  text("Remember, friends: Color is only an illusion! Government too!", X+50, Y-50);
  text("Pop-culture is only an allusion! Red! Blue! What is true!", X+50, Y-25);
  text("Buy Gold, BUY!", X+50, Y);
  
  text("false", width-25, height-10);
  

}









