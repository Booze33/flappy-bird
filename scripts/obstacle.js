class Obstacle {
  constructor(game, x) {
    this.game = game;
    this.spriteWidth = 120;
    this.spriteHeight = 120;
    this.scaledWidth = this.spriteWidth * this.game.ratio;
    this.scaledHeight = this.spriteHeight * this.game.ratio;
    this.x = x;
    this.y = Math.random() * (this.game.height * 0.5 - this.scaledHeight);
    this.collisionY;
    this.collisionX;
    this.collisionRadius = this.scaledWidth;
    this.speedY = Math.random() < 0.5 ? -1 * this.game.ratio: 1 * this.game.ratio;
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.game.speed;
    this.y += this.speedY;
    this.collisionX = this.x + this.scaledWidth * 0.5;
    if (this.y <= 0 || this.y >= this.game.height - this.scaledHeight) {
      this.speedY *= -1;
    }
    if(this.isOffScreen()){
      this.markedForDeletion = true;
      this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion)
    }
    if (this.game.checkCollision){
      this.game.gameOver = true;
      this.game.player.collided = true;
    }
  }

  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
    this.game.ctx.stroke();
  }

  resize() {
    this.scaledWidth = this.spriteWidth * this.game.ratio;
    this.scaledHeight = this.spriteHeight * this.game.ratio;
  }

  isOffScreen() {
    return this.x < -this.scaledWidth;
  }
}

Game.prototype.spawnObstacle = function() {
  if (Math.random() < 0.02) {
      this.obstacles.push(new Obstacle(this));
  }
};

Game.prototype.animate = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.player.update();
  this.player.draw();
  this.obstacles.forEach(obstacle => {
    obstacle.update();
    obstacle.draw();
  });
  this.spawnObstacle();
  this.animationFrameId = requestAnimationFrame(() => this.animate());
};

Game.prototype.HesizeCanvas = function() {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.ctx.imageSmoothingEnabled = false;
};

Game.prototype.animate = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.player.update();
  this.player.draw();

  this.obstacles.forEach((obstacle, index) => {
      obstacle.update();
      obstacle.draw();
      if (this.player.collidesWith(obstacle)) {
          cancelAnimationFrame(this.animationFrameId);
          alert('Game Over');
      }
  });
  this.spawnObstacle();
  this.animationFrameId = requestAnimationFrame(() => this.animate());
};

Game.prototype.drawBackground = function() {
  const bg = new Image();
  bg.src = 'assets/images/background_single.png';
  this.ctx.drawImage(bg, 0, 0, this.width, this.height);
};

Game.prototype.animate = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.drawBackground();
  this.player.update();
  this.player.draw();
  this.obstacles.forEach(obstacle => {
      obstacle.update();
      obstacle.draw();
  });
  this.spawnObstacle();
  this.animationFrameId = requestAnimationFrame(() => this.animate());
};

