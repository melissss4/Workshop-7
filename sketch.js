// let walkers = [];

// function setup() {
// createCanvas (400, 400);
//   background(0);
//   for(i = 0; i < 40; i++) {
//   let x = random(0, width); 
//   let y = random(0, height); 
//   let r = random(0, 255); 
//   let g = random(0, 255);
//   let b= random(0, 255);
//   walkers[i] = new Walker (x, y, r, g, b);
//   }
// }
       
// function draw() {
//  for(x = 0; x < walkers.length; x++){
//   walkers[x].step();
//   walkers[x].show();
//  }
// }
  

  
// class Walker {

//  constructor(x, y, r, g, b){
//   this.x = x;
//   this.y = y; 
//   this.r = r;
//   this.g = 8; 
//   this.b = b;
// }
     
   
// step(){
//   this.x += random(-2, 2); 
//   this.y += random(-2, 2);
// }
   
// show(){
//  strokeWeight(2);
//  stroke(this.r, this.g, this.b);
//  point (this.x, this.y);
// }
   
//  }














let walkers = [];
let userInput, userinputtext;
let button, helpButton = [];
let userLine, redSlider, greenSlider, blueSlider;
let poem = [];
let textOptions = ['Help', "I don't know what to do", 'Brain not working'];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 150; i++) {
    let x = random(20, width);
    let y = random(20, height);
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    walkers[i] = new Walker(x, y, r, g, b);
  }

  userInput = createInput();
  userInput.position(50, 120);
  button = createButton('Add to Poem');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);

  userinputtext = createInput();
  userinputtext.position(50, 180);
  let helpButtonElement = createButton('Help');
  helpButtonElement.position(260, 180);
  helpButtonElement.mousePressed(() => {
    let r = random(textOptions);
    helpButton.push(r);
  });

  redSlider = createSlider(0, 255);
  redSlider.position(50, 20);
  redSlider.size(255);

  greenSlider = createSlider(0, 255);
  greenSlider.position(50, 50);
  greenSlider.size(255);

  blueSlider = createSlider(0, 255);
  blueSlider.position(50, 80);
  blueSlider.size(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let red = redSlider.value();
  let green = greenSlider.value();
  let blue = blueSlider.value();
  background(red, green, blue, 25); 

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].step();
    walkers[i].show();
  }

  fill(255); 
  noStroke();
  writePoem();

  let userText = userinputtext.value();
  text(userText, 50, 230, 185);

  for (let i = 0; i < helpButton.length; i++) {
    text(helpButton[i], 260, 230 + i * 20);
  }
}

function newLine() {
  userLine = userInput.value();
  userInput.value('');
  let words = RiTa.tokenize(userLine); 
  let r = floor(random(0, words.length));
  let rhymes = RiTa.rhymesSync(words[r]); 
  RiTa.rhymesSync
  if (rhymes.length === 0) {
    print("No rhyme found");
    poem.push(userLine);
  } 
 else {
    let changedWord = random(rhymes);
    words[r] = changedWord;
    userLine = RiTa.untokenize(words);
    poem.push(userLine);
  }
}

function writePoem() {
  for (let x = 0; x < poem.length; x++) {
    text(poem[x], 50, 260 + x * 20);
  }
}

class Walker {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.path = [];
  }

  step() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    this.path.push({ x: this.x, y: this.y }); 
    if (this.path.length > 50) this.path.shift(); 
  }

  show() {
    strokeWeight(2);
    stroke(this.r, this.g, this.b);
    for (let i = 1; i < this.path.length; i++) {

    }
    point(this.x, this.y);
  }
}
