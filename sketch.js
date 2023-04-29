var bg, bgImg, ground, groundImg, cityBG; 
var hero, heroImg;
var gameState;
var titleImg;
var bulletImg, bulletGroup;
var bot1Img, bot2Img, botGroup;

function preload(){
bgImg = loadImage("./Images/city_on_fire.webp")
heroImg = loadImage("./Images/Survivor_0.png")
cityBG = loadImage("./Images/Disaster.png")
bulletImg = loadImage("./Images/bullet1.png")
bot1Img = loadAnimation("./Images/bot10.png","./Images/bot11.png")
bot2Img = loadAnimation("./Images/spiker0.png","./Images/spiker1.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);
   bg = createSprite(width/2, height/2, width*1.2, height);
   bg.addImage(cityBG);
   bg.scale = 2;
   bg.visible = false;
   bg.velocityX = -2
  
  ground = createSprite (width/2, height-10, width, 10)
  ground.visible = false;

  hero = createSprite(300,300,30,20);
  hero.addImage(heroImg);
  hero.scale = 0.15;
  hero.visible = false;

  bulletGroup  =  new Group();
  botGroup = new Group();

  gameState = "start";
}

function draw() {
  background(0);


  if (gameState === "start") {
    bg.visible = true;

    titleImg = createImg("./Images/city_on_fire.webp");
    titleImg.position(width/2 - 400, 100);
    titleImg.size(400, 150)


    textSize(40);
    text("PRESS SPACE TO START THE GAME", width/2 - 300, height/2 + 300);

    if (keyDown("space")) {
      gameState = "play";
    }
    
  } else if(gameState === "play"){
    //hideTitle();
      play()
    
    
  } else{
    textSize(35);
    text("GAME OVER", width/2, height/2);
  }

}

function hideTitle(){
  titleImg.hide();

}

function play(){
  hero.visible = true;
  hero.collide(ground);

  if(bg.x-400 < 0){
    bg.x = width/2+450
  }
  
  if (keyDown(LEFT_ARROW)) {
    hero.x = hero.x - 10 ;
  }

  if (keyDown(RIGHT_ARROW)) {
    hero.x = hero.x + 10;
  }

  if (keyDown(UP_ARROW)) {
    hero.velocityY = hero.velocityY-0.9;

  }
  hero.velocityY = hero.velocityY + 0.8  


  spawnBots()
  kill()
  drawSprites()
  

}

function keyPressed(){

  if (keyCode === 32) {
    var bullet = createSprite(hero.x, hero.y);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2
    bullet.velocityX = 30
    bullet.lifetime = width/30
    bulletGroup.add(bullet)
    
  }
}

function spawnBots(){
  if (frameCount%100 === 0){
    var bot1 = createSprite(width, height-10);
    bot1.y = Math.round(random(300,height-10));
    bot1.addAnimation("bot1",bot1Img)
    bot1.velocityX = -10;
    bot1.lifetime = width/10;
    botGroup.add(bot1)}

    if (frameCount%550 === 0){
    var bot2 = createSprite(width, height-10);
    bot2.y = Math.round(random(499,498));
    bot2.addAnimation("bot2",bot2Img)
    bot2.scale = 3
    bot2.velocityX = -10;
    bot2.lifetime = width/10;
    botGroup.add(bot2)
  }
  

}

function kill(){
  
  if (bulletGroup.isTouching(botGroup)) {
    
  }


  if (hero.isTouching(botGroup)) {
    gameState = "end"
  }
}

function end(){

  hero.velocityX = 0
    hero.velocityY = 0
    hero.visible = false
}