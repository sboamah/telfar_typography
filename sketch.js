//Inspired by rs007009 on OpenProcessing

let acier; let neue;
let uggt; let creamt; 
let images; 
let img;
let imgs = [];
let word = "TELFAR";
let subtext = ['SHOP UGG X TELFAR + MORE.', 'FOLLOW @TELFARGLOBAL FOR RESTOCK UPDATES.'];

let index = 0;
let index2 = 0;
let fills; let fills1; let fills2;
let fontSize;
let numOfSlides = 1;
let firstW, firstH;
let angle;
let radius;
let startAngle =    0;     // angle where text should start
let distanceAngle = 360;
let scalar = 20;

function preload() {
  uggt = loadImage('images/uggtelfar4.jpg');
  creamt = loadImage('images/regt.jpg');
 
  images = [uggt, creamt];
  acier = loadFont("fonts/Acier-DisplaySolid.ttf");
  neue = loadFont("fonts/NHaasGroteskTXPro-75Bd.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = createGraphics(windowWidth, windowHeight);
  img.textFont(neue);
  img.translate(width / 2, height / 2);
  img.textAlign(CENTER, CENTER);
  radius = min(width,height) / 7;
  colors = [
    color(220,10),
    color(235),
    color(250)
  ];
  
  // fills2 = [color(23,51,30), 255];
  // fills1 = [color(110,47,57), 255];
  fills = [0, 255];
  
  fontSize = min(width,height)/2;
  angle = radians(0);
}

function draw() {
  background(0);
  img.background(fills[1]);
  uggt.resize(min(width,height)/3, min(width,height)/3);
  creamt.resize(min(width,height)/3, min(width,height)/3);
  
  firstW = width / 4;
  firstH = height / 4;

  let x = (scalar / 2) * sin(angle);

  img.textSize(width / 10);
  img.fill(fills[0]);
  let xMap = map(x, -10, 10, 0,1); //to better understand the sine wave, using a 0-1 scale 
  let subtextMap = map(x, -10, 10, -50,50); //map x for subtext movement
 
  
  if(xMap == 0){
    reverse(fills); //flipping the colors around 
    reverse(images); //changing the images 
    reverse(subtext); //changing the spinning subtext
  }
  
  
  push();
  img.translate(x, 0);
  pop();
  img.text(word, 0, 0);
  
  
  for (let i = 5; i > 1; i--) {
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    image(img, 0, 0, firstW * i, firstH * i); //replicate and shift img 5 times while increasing the size
    pop();
  }

  angle += radians(2);

  if (index < word.length) {
    if(xMap == 0){
    index++;
    }
  } else {
    index = 0;
  }
  
  // let phrase = word[index] + adjs[index];
  
  fill(fills[0]);
  textFont(neue);
  textSize(fontSize/2);
  textAlign(LEFT, CENTER);
  
  push();
  translate(width/4, height/2);
  text(word[index], x, min(width,height)/4);
  scale(-1);
  text(word[index], -x, min(width,height)/4);
  pop();
  
  circleSubText();
  
}

function circleSubText(){
  noFill();
  noStroke();
  circle(width/2,height/2, radius*2);
  
  let angleBetweenLetters = radians(distanceAngle) / subtext[0].length;
  
  push();
  translate(width-width/5, height/4); 
  // move to circle's center
  image(images[0], -100, -20);

  rotate(radians(startAngle/4)); 
  // rotate to where text starts 
    
  for (let i=0; i<subtext[0].length; i++) {   
    
    push();
    rotate(i * angleBetweenLetters);
    translate(0,-radius);           
    fill(fills[0]);
    stroke(fills[1], 100);
    strokeWeight(2);
    textSize(10);
    text(subtext[0][i], 0,0);             
    pop();
  }
  
  
  pop();
  
  startAngle++;
}