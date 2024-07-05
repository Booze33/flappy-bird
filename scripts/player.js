class Player {
  constructor (game) {
    this.game = game;
    this.width = 50;
    this.height = 60;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width;
    this.height;
    this.speedY;
    this.flapSpeed;
    this.collisionX  = this.x;
    this.collisionY;
    this.collisionRadius;
    this.collided;
  }

  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
    this.game.ctx.stroke();
  }

  update() {
    this.y += this.speedY;
    this.collisionY = this.y + this.height * 0.5;
    this.collisionY = this.y;
    if(!this.isTouchingBottom){
      this.speedY += this.game.gravity;
    }

    if (this.isTouchingBottom) {
      this.speedY = this.game.height - this.height;
    }
  }

  resize() {
    this.width = this.spriteWidth * this.game.ratio;
    this.height = this.spriteHeight * this.game.ratio;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedY = -8 * this.game.ratio;
    this.flapSpeed = 5 * this.game.ratio;
    this.collisionRadius = this.width * 0.5;
    this.collisionX = this.x + this.width * 0.5;
    this.collided = false;
  }

  isTouchingTop() {
    return this.y <= 0;
  }

  isTouchingBottom() {
    return this.y >= this.game.height - this.height
  }

  flap() {
    if (!this.isTouchingTop()) {
      this.speedY = -5;
    }
  }
}

// document.addEventListener('keydown', (e) => {
//   if (e.keyCode === 'space') {
//     game.player.jump();
//   }
// });

// Player.prototype.jump = function() {
//   this.speedY = -10;
// }

// Player.prototype.collidesWith = function(obstacle) {
//   return !(
//       this.x + this.width < obstacle.x ||
//       this.x > obstacle.x + obstacle.width ||
//       this.y + this.height < obstacle.y ||
//       this.y > obstacle.y + obstacle.height
//   );
// };

// Player.prototype.draw = function() {
//   const img = new Image();
//   img.src = 'assets/images/player_fish.png';
//   this.game.ctx.drawImage(img, this.x, this.y, this.width, this.height);
// };

