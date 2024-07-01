document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas, ctx);
  game.start();
});

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.player = new Player(this);
    this.gravity = 0.5;
    this.animationFrameId = null;
  }

  start() {
    this.animate();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.update();
    this.player.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
}

class Obstacle {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.height = Math.random() * (this.game.height / 2);
    this.x = this.game.width;
    this.y = Math.random() > 0.5 ? 0 : this.game.height - this.height;
    this.speedX = 5;
  }

  update() {
    this.x -= this.speedX;
  }

  draw() {
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
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

Game.prototype.resizeCanvas = function() {
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