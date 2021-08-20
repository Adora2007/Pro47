var PLAY = 1;
var END = 0;
var gameState = PLAY;

var playerImage, player;
var backgroundImg, background;
var ground;
var obstacaleImg;
var coinImg;
var coinGroup, obstacleGroup;
var score = 0;
var playerCollided;

function preload(){
playerImage = loadAnimation("a.png","b.png","c.png");

backgroundImg = loadImage("background.jpg");

obstacaleImg = loadImage("Obstacle.png");

coinImg = loadImage("Coin.png");

playerCollided = loadAnimation("c.png");

}




function setup(){
  createCanvas(windowWidth, windowHeight)

player = createSprite(windowWidth-1100,windowHeight-120,50,100);
player.addAnimation("Img", playerImage);
player.addAnimation("collided",playerCollided);
player.scale=1.5;


background = createSprite(0,0, windowWidth,windowHeight);
background.scale = 1;
background.addImage(backgroundImg);
background.velocityX = -3;
background.depth = player.depth;
player.depth =  player.depth+1;

background.x = background.width/2;

ground = createSprite(550,650,windowWidth + 2000,10);
ground.velocityX = -3;
ground.x = ground.width/2;

coinGroup = new Group();
obstacleGroup = new Group();
}


function draw(){
 

 

  if(gameState === PLAY){
    if(background.x < 0){
      background.x = background.width/2;
    }
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && player.y >=500 ){
      player.velocityY= -20;
  
    }
    player.velocityY = player.velocityY+0.8;
    player.collide(ground);

    if(obstacleGroup.isTouching(player)){
      gameState = END;

    }

    spawnObstacles();
    spawnCoin();
  }

  if(gameState === END ){
    ground.velocityX = 0;

    background.velocityX = 0;

    player.velocityY = 0;
   obstacleGroup.setVelocityXEach(0);
   coinGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    player.changeAnimation("collided", playerCollided);
  }

  drawSprites();
  

 textSize(35);
 fill(255);
 text("Score : "+score,110,80);



}

function spawnObstacles(){
  if(frameCount % 100 === 0){

    var obstacle = createSprite(1200,600,40,40);
    obstacle.y= Math.round(random(400,600));
   obstacle.addImage(obstacaleImg);
   obstacle.velocityX = -3;
   obstacle.scale = 0.1;
   obstacle.lifetime=1000;
   obstacleGroup.add(obstacle);

  }
}
function spawnCoin(){
  if(frameCount % 150 === 0){
    var coin = createSprite(1200,600,40,30);
    coin.y=Math.round(random(200,350));
    coin.addImage(coinImg);
    coin.velocityX= -5;
    coin.scale = 0.2;
    coin.lifetime=1000;
    coinGroup.add(coin);
  }
}