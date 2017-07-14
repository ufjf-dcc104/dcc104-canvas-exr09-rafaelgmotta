var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var tempo = 200;
var i = 1;
var j = 1;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 800;
  canvas.height = 520;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,3,2,1],
    [1,2,1,3,2,2,2,2,1,1,1,1],
    [1,2,2,1,1,1,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,3,2,2,1,1,2,2,2,1],
    [1,2,1,2,1,1,2,2,2,1,2,1],
    [1,2,1,2,2,1,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.y = (i+0.5)*map.SIZE;
  pc.x = (j+0.5)*map.SIZE;
  pc.g = 75;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function passo(t){

  if(map.tesouros != 0 && tempo > 0){
    
    dt = (t-anterior)/1000;
    requestAnimationFrame(passo);

    ctx.save();

    pc.mover(map, dt);

    tempo = tempo - dt*10;

    map.desenhar(ctx, images);
    pc.desenhar(ctx);

    anterior = t;

    ctx.restore();

    map.showInformations(ctx, tempo);


  } else if(tempo < 0){
    ctx.font="20px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText("Tempo esgotado! Game Over", 145, 235); 
  } else {
    ctx.font="20px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("Você venceu!", 185, 235); 
  }
}



function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 32:
          pc.ay = -250;
        e.preventDefault();
        break;
      case 37:
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 32: pc.ay = 200;
        break;
      case 37:
        pc.ax = 0;
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 39:
        pc.ax = 0;
        pc.vx = 0;
        pc.pose = 4;
        break;
      default:

    }
  });
}
