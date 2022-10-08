var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceShip, spaceShipImg;
var e_spaceShipGroup, e_spaceShipImg, e_spaceShip2Img, e_spaceShip3Img;
var galaxy_bcgrd, galaxy_bcgrdImg;

var score;
var gameOverImg, restartImg;

function preload(){
    galaxy_bcgrdImg = loadImage("Space Background.png");
    spaceShipImg = loadImage("SPace_ship.png");

    e_spaceShipImg = loadImage("Evil_Space_Ship.png");
    e_spaceShip2Img = loadImage("Evil_Space_Ship2.png");
    e_spaceShip3Img = loadImage("Evil_Space_Ship3.png");

    gameOverImg = loadImage("GameOverImg.jpg");
    restartImg = loadImage("RestartImage.PNG");
}


function setup() {
    createCanvas(windowWidth,windowHeight);

    galaxy_bcgrd = createSprite(windowWidth,windowHeight);
    galaxy_bcgrd.addImage(galaxy_bcgrdImg);

    spaceShip = createSprite(400,180,20,50);
    spaceShip.addImage(spaceShipImg);
    spaceShip.scale = 0.5;

    gameOver = createSprite(400,400);
    gameOver.addImage(gameOverImg);

    restart = createSprite(400,450);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    e_spaceShipGroup = createGroup();
    score = 0;
}

function draw() {
    background(galaxy_bcgrd);
    text("Score: "+ score, 750,50);

    if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

        galaxy_bcgrd.velocityX = 4;
        score = score + Math.round(frameCount/60);

        if(galaxy_bcgrd.x < 0){
            galaxy_bcgrd.x = galaxy_bcgrd.width/2;
        }

        if(keyCode === UP_ARROW) {
            spaceShip.velocityY = -2;
        }

        if(keyCode === DOWN_ARROW) {
            spaceShip.velocityY = 2;
        }

        spawnEships();

        if(e_spaceShipGroup.isTouching(spaceShip)) {
            gameState = END;
        }
    }
     else if (gameState === END) {

        gameOver.visible = true;
        restart.visible = true;

            galaxy_bcgrd.velocityX = 0;

        e_spaceShipGroup.setVelocityXEach(0);
        e_spaceShipGroup.setLifetimeEach(-1);
    }

    drawSprites();
}

function spawnEships() {
    if (frameCount % 60 === 0) {
        var e_spaceShip = createSprite(750,400,10,40);
        e_spaceShip.velocityX = -6;

        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: e_spaceShip.addImage(e_spaceShipImg);
                    break;
            case 2: e_spaceShip.addImage(e_spaceShip2Img);
                    break;
            case 3: e_spaceShip.addImage(e_spaceShip3Img);
                    break;
            default: break;
        }

        e_spaceShip.scale = 0.5;
        e_spaceShipGroup.add(e_spaceShip);
    }

}
