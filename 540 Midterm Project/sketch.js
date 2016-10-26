var x = 0;
var y = 0;
var stateStats = [
  ["Alabama", "AL", 9, -13, -13, 48, 0, 0, false, true, false, 748+x, 500+y],
  ["Alaska", "AK", 3, -1, -1, 37, 0, 0, false, true, false, 117+x, 117+y],
  ["Arizona", "AZ", 11, 5, 5, 39, 0, 0, true, false, false, 340+x, 492+y],
  ["Arkansas", "AR", 6, -21, -21, 55, 0, 0, false, true, false, 614+x, 431+y],
  ["California", "CA", 55, 26, 26, 56, 0, 0, true, false, false, 220+x, 450+y],
  ["Colorado", "CO", 9, 8, 8, 45, 0, 0, true, false, false, 415+x, 415+y],
  ["Connecticut", "CT", 7, 15, 15, 50, 0, 0, true, false, false, 1131+x, 202+y],
  ["Delaware", "DE", 3, 21, 21, 51, 0, 0, true, false, false, 1031+x, 266+y],
  ["District of Columbia", "DC", 3, 50, 50, 75, 0, 0, true, false, false, 1031+x, 313+y],
  ["Florida", "FL", 29, 4, 4, 48, 0, 0, true, false, false, 935+x, 593+y],
  ["Georgia", "GA", 16, -6, -6, 48, 0, 0, false, true, false, 835+x, 491+y],
  ["Hawaii", "HI", 4, 20, 20, 60, 0, 0, true, false, false, 117+x, 600+y],
  ["Idaho", "ID", 4, -10, -10, 40, 0, 0, false, true, false, 295+x, 210+y],
  ["Illinois", "IL", 20, 25, 25, 53, 0, 0, true, false, false, 706+x, 280+y],
  ["Indiana", "IN", 11, -4, -4, 45, 0, 0, false, true, false, 794+x, 280+y],
  ["Iowa", "IA", 6, -4, -4, 43, 0, 0, false, true, false, 613+x, 292+y],
  ["Kansas", "KS", 6, -11, -11, 47, 0, 0, false, true, false, 551+x, 360+y],
  ["Kentucky", "KY", 8, -16, -16, 41, 0, 0, false, true, false, 748+x, 360+y],
  ["Louisiana", "LA", 8, -7, -7, 45, 0, 0, false, true, false, 618+x, 498+y],
  ["Maine", "ME", 4, 8, 8, 44, 0, 0, true, false, false, 1216+x, 71+y],
  ["Maryland", "MD", 10, 36, 36, 63, 0, 0, true, false, false, 965+x, 280+y],
  ["Massachusetts", "MA", 11, 26, 26, 54, 0, 0, true, false, false, 1137+x, 132+y],
  ["Michigan", "MI", 16, 10, 10, 47, 0, 0, true, false, false, 796+x, 187+y],
  ["Minnesota", "MN", 10, 1, 1, 44, 0, 0, true, false, false, 621+x, 224+y],
  ["Mississippi", "MS", 6, -13, -13, 52, 0, 0, false, true, false, 682+x, 500+y],
  ["Missouri", "MO", 10, -5, -5, 47, 0, 0, false, true, false, 621+x, 361+y],
  ["Montana", "MT", 3, -10, -10, 46, 0, 0, false, true, false, 403+x, 210+y],
  ["Nebraska", "NE", 5, -27, -27, 56, 0, 0, false, true, false, 553+x, 301+y],
  ["Nevada", "NV", 6, 7, 7, 47, 0, 0, true, false, false, 326+x, 344+y],
  ["New Hampshire", "NH", 4, 3, 3, 41, 0, 0, true, false, false, 1167+x, 71+y],
  ["New Jersey", "NJ", 14, 14, 14, 49, 0, 0, true, false, false, 1100+x, 285+y],
  ["Mew Mexico", "NM", 5, 13, 13, 46, 0, 0, true, false, false, 408+x, 481+y],
  ["New York", "NY", 29, 24, 24, 54, 0, 0, true, false, false, 1040+x, 174+y],
  ["North Carolina", "NC", 15, 2, 2, 46, 0, 0, true, false, false, 989+x, 451+y],
  ["North Dakota", "ND", 3, -11, -11, 43, 0, 0, false, true, false, 558+x, 210+y],
  ["Ohio", "OH", 18, -1, -1, 44, 0, 0, false, true, false, 880+x, 280+y],
  ["Oklahoma", "OK", 7, -15, -15, 51, 0, 0, false, true, false, 549+x, 421+y],
  ["Oregon", "OR", 7, 10, 10, 48, 0, 0, true, false, false, 172+x, 318+y],
  ["Pennsylvania", "PA", 20, 6, 6, 47, 0, 0, true, false, false, 930+x, 183+y],
  ["Rhode Island", "RI", 4, 20, 20, 52, 0, 0, true, false, false, 1190+x, 196+y],
  ["South Carolina", "SC", 9, -4, -4, 42, 0, 0, false, true, false, 912+x, 481+y],
  ["South Dakota", "SD", 3, -11, -11, 43, 0, 0, false, true, false, 558+x, 252+y],
  ["Tennessee", "TN", 11, -12, -12, 50, 0, 0, false, true, false, 748+x, 430+y],
  ["Texas", "TX", 38, -3, -3, 41, 0, 0, false, true, false, 514+x, 520+y],
  ["Utah", "UT", 6, -1, -1, 30, 29, 29, false, true, false, 348+x, 420+y],
  ["Vermont", "VT", 3, 28, 28, 45, 0, 0, true, false, false, 1121+x, 74+y],
  ["Virginia", "VA", 13, 15, 15, 44, 3, 3, true, false, false, 970+x, 368+y],
  ["Washington", "WA", 12, 16, 16, 47, 0, 0, true, false, false, 180+x, 220+y],
  ["West Virginia", "WV", 5, -32, -32, 60, 0, 0, false, true, false, 900+x, 353+y],
  ["Wisconsin", "WI", 10, 8, 8, 47, 0, 0, true, false, false, 706+x, 195+y],
  ["Wyoming", "WY", 3, -35, -35, 54, 0, 0, false, true, false, 403+x, 303+y]];



function setup() {
  createCanvas(1920, 1080);
  var HRCnDJTSlider = createSlider(0, 100, 50);
  HRCnDJTSlider.position(200+x, 700+y);
  var EvanSlider = createSlider(0, 100, 0);
  EvanSlider.position(800+x, 700+y);
  
}

function draw() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  for (var i = 0; i<51; i++) {
    if (stateStats[i][4] >= 0) {
      fill('blue');
    }
    else {
      fill('red');
    }
    rect(stateStats[i][11], stateStats[i][12], proportion(stateStats[i][2]), proportion(stateStats[i][2]));
    fill('white');
    text(stateStats[i][1], stateStats[i][11], stateStats[i][12]);
  }
}

function proportion(num) {
  return (int(20*sqrt(num)));
}



