var player, map;

var gameState, menuState;

var BJG

var startButton;

function preload() {

  BJG = loadFont('assets/BJG.woff');
}

function setup() {
  createCanvas(640, 640);

  gameState = 'start';
  menuState = 'play';

  player = new Player(320,320,"assets/player.png", "assets/smolstaff.png");
  map = new Map(loadImage("assets/wall1.png"),loadImage("assets/tree1.png"),loadImage("assets/fence1.png"));

  map.drawMap();
}

function draw() {
  background(rgb(15, 0, 20));

  if(gameState == 'start'){
    player.sprite.visible = false;
    player.staff.visible = false;
    player.hp3.visible = false;
    player.hp2.visible = false;
    player.hp1.visible = false;

    drawSprites();

    if(menuState == 'play'){
      textSize(90);
      textFont(BJG);
      fill(rgb(222, 210, 202));
      text('UNTITLED',102,260);
      
      textSize(30);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('Press "enter"',210,330);
      text('to start',250,350);

      textSize(30);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('Press "s"',238,500);
      text('to change',238,520);
      text('settings',245,540);
      
      if(keyWentDown('s')){
        menuState = 'settings';

      }

      if(keyDown('enter')){
        player.sprite.visible = true;
        player.staff.visible = true;

        player.hp = 3;

        gameState = 'game';
      }
    }

    if(menuState == 'settings'){
      textSize(90);
      textFont(BJG);
      fill(rgb(222, 210, 202));
      text('SETTINGS',100,200);

      textSize(20);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('click to change settings',178,230);

      textSize(30);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('Music:',210,280);

      textSize(30);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('SFX:',250,330);

      textSize(30);
      textFont(BJG);
      fill(rgb(194, 175, 163));
      text('Press "esc"',228,500);
      text('to go back',235,520);
      


      if(keyWentDown('esc')){
        menuState = 'play';

      }

    }
  }
  if(gameState == 'game'){

    textSize(30);
    textFont(BJG);
    fill(rgb(194, 175, 163));
    text(player.score, 40, 80);


    player.movement();
    player.stafflogic();
    player.healthLogic();

    player.sprite.collide(map.tile_colliders);

    if(player.hp == 0){
      player.sprite.visible = false;
      player.staff.visible = false;
      player.hp3.visible = false;
      player.hp2.visible = false;
      player.hp1.visible = false;

      gameState = 'over';
    }
    drawSprites();
  }
  if(gameState == 'over'){


    textSize(60);
    textFont(BJG);
    fill(rgb(222, 210, 202));
    text('GAME OVER',160,280);

    textSize(30);
    textFont(BJG);
    fill(rgb(194, 175, 163));
    text(player.score, 310, 380);

    textSize(30);
    fill(rgb(194, 175, 163));
    text('Press "enter"',210,330);
    text('to restart',230,350);

    if(keyDown('enter')){
      player.sprite.visible = false;
      player.staff.visible = false;

      player.score = 0;

      player.sprite.x = 320;
      player.sprite.y = 320;
      player.sprite.velocityX = 0;
      player.sprite.velocityY = 0;
      

      gameState = 'start';
    }
    drawSprites();
  }

  //drawSprites();
}