var bg;
var ground;
var elsa,elsaImage;
var topGround;
var obs1,obs2;
var top;
var cloudsGroup, cloudImage1,cloudImage2;
var snowflackes;
var obsGroup,snowGroup;
var fireballsGroup,fireballImage1,fireballImage2;
var score=0;
var power=50;
var olafGroup;
var olafImage;


function preload(){
bg=loadImage("assets/bgck.jpg");
cloudImage1 = loadImage("assets/cloud.jpg");
cloudImage2 = loadImage("assets/cloud.jpg");
elsaImage=loadImage("assets/elsa2.png");
obs1=loadImage("assets/m.png");
obs2=loadImage("assets/m3.png");
snowflackes=loadImage("assets/snow.png");
fireballImage1=loadImage("assets/fball.png");
fireballImage2=loadImage("assets/fball.png");
olafImage=loadImage("assets/olaf.png");

}





function setup() {
  createCanvas(windowWidth,windowHeight);
  ground=createSprite(500,300,2000,600);
  ground.addImage("ground",bg);
  ground.scale=2.2;
 ground.velocityX=-3;
ground.x=width/2;
 elsa=createSprite(50,100)
 elsa.addImage("elsa",elsaImage);
 elsa.scale=0.2;

 topGround = createSprite(500,10,800,20);

 topGround.visible = false;


 obsGroup = new Group();
 snowGroup = new Group();
 fireballsGroup = new Group();
 olafGroup=new Group();


}

function draw() {
  background(255,255,255);
  if (ground.x<0) {
    ground.x=ground.width/2;
  } 
  topObs();
  elsa.y=World.mouseY;
  if (keyWentDown("space")) {
    shoot();
    power=power-1;
  }
  
  if (obsGroup.isTouching(snowGroup)) {
    for (var i =0; i< obsGroup.length; i++) {
     if (obsGroup[i].isTouching(snowGroup)) {
       obsGroup[i].destroy();
       snowGroup.destroyEach();
       score=score+10;
     }
      
    }
  }
  if (olafGroup.isTouching(elsa)) {
    for (var i =0; i< olafGroup.length; i++) {
     if (olafGroup[i].isTouching(elsa)) {
       olafGroup[i].destroy();
       power=power+5;
       
     }
      
    }
  }

  if (obsGroup.isTouching(elsa)) {
   for (var i =0; i< obsGroup.length; i++) {
    if (obsGroup[i].isTouching(elsa)) {
       obsGroup[i].destroy();
       elsa.destroy();
       gameOver();
     
     }
      
    }
  }
 if (fireballsGroup.isTouching(elsa)) {
   for (var i =0; i< fireballsGroup.length; i++) {
   if (fireballsGroup[i].isTouching(elsa)) {
   fireballsGroup[i].destroy();
      elsa.destroy();
      gameOver();
   }
      
   }
  }

 // clouds();
  fireball();
  olaf();
  drawSprites();


 fill("aqua")
 textSize(50);
  text("score:"+score,1000,100);
  text("power:"+power,1000,150);

if (power===0) {
  gameOver();
}

  
  



  

}

function topObs() {
  if (World.frameCount%250===0) {
  var top= createSprite(500,300,40,40);
  //top.addImage(obs1);
  top.scale=0.3
  
   top.velocityX=(-5);
   top.y=random(100,500); 
   var r=Math.round(random(1,2));
  if (r===1) {
     top.addImage("top1",obs1);
   } else {
    top.addImage("top2",obs2);
   }
   obsGroup.add(top);
  }

 




}
function olaf() {
  if (World.frameCount%400===0) {
  var olaf= createSprite(500,300,40,40);
 
  olaf.scale=0.3
  
   olaf.velocityX=(-5);
   
  
     olaf.addImage("olaf",olafImage);
  
   
   olafGroup.add(olaf);
  }

 




}

function clouds() {
  if (World.frameCount%20===0) {
  var cloud= createSprite(500,300,40,40);
  
  cloud.scale=0.3;
  
   cloud.velocityX=(-5);
   cloud.y=random(50,200); 
   var r=Math.round(random(1,2));
  if (r===1) {
     cloud.addImage("cloud1",cloudImage1);
   } else {
    cloud.addImage("cloud2",cloudImage2);
   }



  }

}
function shoot() {
  var snow=createSprite(elsa.x,elsa.y);
  snow.addImage("snow",snowflackes);
  snow.velocityX=10;
  snow.scale=0.05;
  snowGroup.add(snow);
}

function fireball() {
  if (World.frameCount%500===0) {
  var fireball= createSprite(400,100,40,40);
  
  fireball.scale=0.1;
  
  
  fireball.velocityX=(-5);
  fireball.y=random(50,200); 
   var r=Math.round(random(1,2));
  if (r===1) {
    fireball.addImage("fireball1",fireballImage1);
   } else {
    fireball.addImage("fireball2",fireballImage2);
   }

   fireballsGroup.add(fireball);



  }

}

function gameOver() {
  ground.velocityX=0;
  obsGroup.setVelocityXEach(0);
  fireballsGroup.setVelocityXEach(0);
  fill("aqua")
  textSize(50);
   text("gameOver",500,200);
   obsGroup.destroyEach();
   fireballsGroup.destroyEach();
  
   swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
   
  });
}









