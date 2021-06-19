var ship,rocketImg;
var asteroid,asteroidGroup,astImg;
var missile,missileGroup,misImg;
var space,spaceImg;
var edges;
var gameState = "play";
var score = 0;
var gameOver,gameOverImg;
var win,winImg;

function preload(){

  rocketImg =loadImage("ship.png");
  spaceImg = loadImage("background.png");
  gameOverImg = loadImage("gameOver.png");
  astImg = loadImage("ast.png");
  misImg = loadImage("mis.png");
  winImg = loadImage("win.png");
} 

function setup() {
 createCanvas(600,600);
  
  ship = createSprite(300,480);
  ship.addImage("working",rocketImg);
  ship.scale = 0.3;
  

  
  space = createSprite(300,300,600,600);
  space.addImage("moving",spaceImg);
  space.scale = 8;
  space.depth = ship.depth;
  space.depth = space.depth-1
  
  gameOver = createSprite(300,300,25,30);
  gameOver.addImage("lost",gameOverImg);
  
  win = createSprite(300,300,40,40);
  win.addImage("winning",winImg);
  
  asteroidGroup = new Group();
  missileGroup = new Group();
  
 ship.debug = true;
  
  score = 0;
  score.depth = space.depth;
  score.depth = score.depth+1;
}

function draw() {
  background(0);
 edges = createEdgeSprites();
  
  
  ship.collide(edges);
  
  if(gameState === "play"){
     space.velocityY = 2;
     
    if( space.y > 600){
    space.y = 300;
     
     }
    
     if(keyDown("RIGHT_ARROW")){
     ship.x += 3
     }
    
     if(keyDown("LEFT_ARROW")){
     ship.x -= 3
     }
      if(frameCount%140 === 0){
    asteroids();
     }
  
  if(frameCount%100 === 0){
    missiles();
  }
  
    if(ship.isTouching(asteroidGroup) ){
    gameState = "end";
     
     }
    
    if(ship.isTouching(missileGroup) ){
    gameState = "end";
     
     }
  
    gameOver.visible = false;
    win.visible = false;
    

    
    if(keyDown("up_arrow")){
       ship.velocityY = -1;
       
       }
    
    if(keyDown("down_arrow")){
       ship.velocityY = 1;
       
       }
    
   score = score+Math.round(random(getFrameRate()/15)) 
    
  }
  
  if(gameState === "end"){
    
    space.velocityY = 0;
    asteroidGroup.destroyEach();
    missileGroup.destroyEach();
    ship.velocityY = 0;
    space.scale = 0;
    gameOver.visible = true;
    ship.destroy();
    win.visible = false;
    }
  
  if (gameState === "win"){
    space.velocityY = 0;
    asteroidGroup.destroyEach();
    missileGroup.destroyEach();
    ship.velocityY = 0;
    space.scale = 0;
    win.visible = true;
    
    
  }
    
    if(score === 3000){
       gameState = "win";
       }
       
     
  
 drawSprites();
  fill("yellow");
  text("score:"+score,20,20);
  
}

function asteroids(){
  
  asteroid = createSprite(300,-50);
  asteroid.addImage(astImg);
  asteroid.scale = 0.1;
  asteroid.velocityY = 2;
  asteroid.x = Math.round(random(10,600));
  asteroid.lifetime = 600;
  asteroid.depth = space.depth;
  asteroid.depth = asteroid.depth+1;
  asteroidGroup.add(asteroid);
}

function missiles(){
  
  missile = createSprite(300,-50);
  missile.addImage(misImg);
  missile.scale = 0.1;
  missile.velocityY = 2;
  missile.x = Math.round(random(10,600));
  missile.lifetime = 600;
  missile.depth = space.depth;
  missile.depth = missile.depth+1;
  missileGroup.add(missile);
}

