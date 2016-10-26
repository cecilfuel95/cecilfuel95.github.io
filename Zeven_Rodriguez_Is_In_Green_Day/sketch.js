var myArray = ["Zeven's Awake", "From Seven", "To Eleven", "All Day", "Every Day", "ALL DAY", "EVERY DAY", "ALL DAY",
  "GREEN DAY", "I WALK A LONELY ROAD THE ONLY ROAD THAT I HAVE EVER KNOWN DON'T KNOW WHERE IT GOES BUT IT'S HOME TO ME SO I WALK ALONE"];
var greenDay;
var zeven;
var zevenWink;

function preload() {
  greenDay = loadImage("Green-Day.png");
  zeven = loadImage("Zeven_Rodriguez.png");
  zevenWink = loadImage("Zeven_Rodriguez_Wink.png")
}

function setup() {
  createCanvas(823,400);
  image(greenDay, 150, 150, greenDay.width/2, greenDay.height/2);
  image(zeven, 250, 250, zeven.width/2.75, zeven.height/2.75);
  for (var i = 0; i < myArray.length; i++) {
    text(myArray[i], 0, (i*10) + 10);
  }
  
}

function draw() {
}

function mousePressed() {
  image(zevenWink, 250, 250, zevenWink.width/2.75, zevenWink.height/2.75);
}

function mouseReleased() {
   image(zeven, 250, 250, zeven.width/2.75, zeven.height/2.75);
}