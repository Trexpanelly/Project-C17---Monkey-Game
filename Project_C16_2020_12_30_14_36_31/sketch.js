
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  
  
  monkeyscape =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(20, 315, 20, 20);
  monkey.addAnimation("moving", monkeyscape);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  FoodGroup = createGroup(banana);
  obstacleGroup = createGroup(obstacle);
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  background("white");
  
  text("score :"+ score, 300, 50);
  text("Survival Time :" + survivalTime, 150, 50);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  if(FoodGroup.isTouching(monkey)){
    score = score + 4;
  }
  
    if(frameCount%30===0){
      survivalTime = survivalTime + 1
    }
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(monkey.y < 140){
    monkey.velocityY = 8;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    survivalTime = 0;
  }
  
  monkey.collide(ground);
  
  Jumpananas();
  stoned();
  
  drawSprites();
}

function Jumpananas() {
  if(frameCount%80===0){
    banana = createSprite(400, 200, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(140, 240));
    banana.velocityX = -6;
    banana.setLifetime = 100;
    
    FoodGroup.add(banana);
  }
}

function stoned() {
  if(frameCount%300 === 0){
    obstacle = createSprite(400, 325, 50, 50);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6 + (survivalTime/14));
    
    obstacleGroup.add(obstacle);
  }
}


