function signedMod(a, n) 
{
   return a - Math.floor(a/n) * n;
}

class DrawbotFollowController extends DrawbotController
{
  constructor() {
    super();

    this.target = this.turtle.tip();
    this.pos = this.turtle.tip();
    this.vel = this.turtle.direction();
    this.veld = {x:0, y:0};
    this.dt = 0.1*1000; // how fast we should update in milliseconds (don't want to overload bot)
    this.lastTime = new Date();
    this.timer = this.dt;
  }

  seek(pos, target) {
    let vd = {x: target.x-pos.x, y: target.y-pos.y};
    let mag = Math.sqrt(vd.x*vd.x + vd.y*vd.y);
    if (mag < 0.000001) {
      return vd;
    }
    vd.x = vd.x / mag;
    vd.y = vd.y / mag;
    return vd;
  }

  init() {
  }

  update() {
    var vd = this.seek(this.pos, this.target);
    var diffx = this.pos.x-this.target.x;
    var diffy = this.pos.y-this.target.y;
    var distance = Math.sqrt(diffx*diffx + diffy*diffy);

    if (distance > 10) 
    {
      var v = this.turtle.direction();
      var theta = Math.acos(vd.x*v.x + vd.y*v.y);
      if (Math.abs(theta) > Math.PI/8)
      {
         var sign = vd.x * v.y - v.x * vd.y;
         if (sign > 0) goRight(0.2);
         else goLeft(0.2);
      }
      else
      {
        goForward(0.2);
      }
    }
 
    this.pos = this.turtle.tip();
    this.veld = vd; 
    this.vel = this.turtle.direction();
    //console.log(state)
  }

  mouseDragged(mouseX, mouseY) {
    this.target = {x:mouseX, y:mouseY};
  }

  mousePressed(mouseX, mouseY) {
  }

  draw() {
    var timeNow = new Date();
    var elapsedTime = timeNow - this.lastTime;
    this.lastTime = timeNow;
    this.timer -= elapsedTime;
    if (this.timer < 0)
    {
      this.update();
      this.timer = this.dt;
    }

    fill(255,0,0);
    noStroke();
    ellipse(this.target.x, this.target.y, 15, 15);

    fill(0,0,255);
    ellipse(this.pos.x, this.pos.y, 25, 25); 
    stroke(0,0,0);
    line(this.pos.x, this.pos.y, this.pos.x+100*this.vel.x, this.pos.y+100*this.vel.y);
    stroke(0,255,0);
    line(this.pos.x, this.pos.y, this.pos.x+100*this.veld.x, this.pos.y+100*this.veld.y);


    super.draw();
  }
}

var controller = new DrawbotFollowController();
