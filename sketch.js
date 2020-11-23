var sword, microbe, fruit, gameOver
var swordImage
var spawnMicrobes, spawnFruits
var cuttingSound, gameOverSound
var microbeGroup, microbeImage
var fruitGroup, fruit1Image
var gameoverImage
var score
//game states
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  swordImage = loadImage("sword.png")
  microbeImage = loadImage("alien1.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  gameoverImage = loadImage("gameover.png")

  cuttingSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(500, 550)

  // creating sword
  sword = createSprite(40, 200, 20, 20)
  sword.addImage("sword", swordImage)
  sword.scale = 0.4

  //creating gameoverImage
  gameOver = createSprite(250, 250, 30, 30)
  gameOver.addImage("gameover", gameoverImage)
  gameOver.visible = false

  // creating collider for sword
  sword.setCollider("rectangle", 0, 0, 40, 30)
  sword.debug = false

  // creating groups for fruits and enemy
  enemyGroup = createGroup();
  fruitGroup = createGroup();

  score = 0
}

function draw() {
  background("lightblue")

  if (gameState === PLAY) {
    // moving the sword with the mouse 
    sword.y = World.mouseY
    sword.x = World.mouseX

    //if sword touches any fruit increment the score by 2
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 2
      cuttingSound.play();
    }
    spawnMicrobes();
    spawnFruits();
    if (enemyGroup.isTouching(sword)) {

      gameState = END
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      enemyGroup.setVelocityXEach(0);
      fruitGroup.setVelocityXEach(0);
      sword.addAnimation("sword", gameoverImage)
      sword.x = 250
      sword.y = 250
      gameOverSound.play();
    } else if (gameState === END) {
      gameOver.visible = true
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
    }




  }



  drawSprites();
  //displaying score
  text("Score: " + score, 400, 50);
}

function spawnMicrobes() {
  if (World.frameCount % 200 === 0) {
    var microbe = createSprite(400, 200, 20, 20);
    microbe.addAnimation("enemy", microbeImage)
    microbe.y = Math.round(random(100, 300))
    microbe.velocityX = -(8 + (score / 10));
    microbe.setLifetime = 50

    enemyGroup.add(microbe)
  }
}

function spawnFruits() {
  if (World.frameCount % 80 === 0) {

    var fruit = createSprite(100, 200, 20, 20);
    fruit.scale = 0.2

    //fruit.debug = true;

    r = Math.round(random(1, 4));
    if (r === 1) {
      fruit.addImage(fruit1Image)
    } else if (r === 2) {
      fruit.addImage(fruit2Image);
    } else if (r === 3) {
      fruit.addImage(fruit3Image);
    } else if (r === 4) {
      fruit.addImage(fruit4Image);
    }

    fruit.y = Math.round(random(100, 340));
    fruit.velocityX = (7 + (score / 4));
    fruit.setLifetime = 100;
    fruitGroup.add(fruit)
  }
}