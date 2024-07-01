class Player {
  constructor (game) {
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.x = 100;
    this.y = this.game.height / 2 - this.height / 2;
  }

  update() {
    this.speedY += this.game.gravity;
    this.y += this.speedY;

    if (this.y + this.height > this.game.height) {
      this.y = this.game.height - this.height;
      this.speedY = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    }
  }

  draw() {
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 'space') {
    game.player.jump();
  }
});

Player.prototype.jump = function() {
  this.speedY = -10;
}

Player.prototype.collidesWith = function(obstacle) {
  return !(
      this.x + this.width < obstacle.x ||
      this.x > obstacle.x + obstacle.width ||
      this.y + this.height < obstacle.y ||
      this.y > obstacle.y + obstacle.height
  );
};

Player.prototype.draw = function() {
  const img = new Image();
  img.src = 'assets/images/player_fish.png';
  this.game.ctx.drawImage(img, this.x, this.y, this.width, this.height);
};

