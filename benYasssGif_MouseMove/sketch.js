var gif;
var div = 3;
var xPo;
var yPo;

function setup() {
  createCanvas(960, 540);
  gif = loadGif('0001BenjaminYasss.gif');
  gif.pause();
}

function draw() {
  background(0);
  if (gif.loaded()) {
    /*console.log(xPo, yPo);
    for (yPo = 0; yPo > height; yPo = yPo+(width/div)){
      console.log(xPo, yPo);
      for (xPo = 0; xPo > width; xPo = xPo+(height/div)) {
        console.log(xPo, yPo);
        image(gif, xPo, yPo, 192, 108);
      }
    }*/
    
    image(gif, 0, 0, 320, 180);
    image(gif, 320, 0, 320, 180);
    image(gif, 640, 0, 320, 180);
    image(gif, 0, 180, 320, 180);
    image(gif, 320, 180, 320, 180);
    image(gif, 640, 180, 320, 180);
    image(gif, 0, 360, 320, 180);
    image(gif, 320, 360, 320, 180);
    image(gif, 640, 360, 320, 180);
  }
}

function mouseMoved() {
  if (gif.loaded()) {
    var frame = int(map(mouseX, 0, width, 0, gif.totalFrames()));
    gif.frame(frame);
  }
}
