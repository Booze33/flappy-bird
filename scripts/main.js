class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.gravity;
    this.speed;
    this.score;
    this.gameOver;
    this.timer;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', (e) => {
      this.resize(window.innerWidth, window.innerHeight);
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.player.flap();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') this.player.flap();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      this.player.flap();
    });
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.fillStyle = 'red';
    this.ctx.font = '15px Bungee';
    this.ctx.textAlign = 'right';
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;

    this.gravity = 0.15 * this.ratio;
    this.speed = 3 * this.ratio;
    this.background.resize();
    this.player.resize();
    this.createObstacles();
    this.obstacles.forEach(obstacle => {
      obstacle.resize();
    });
    this.score = 0;
    this.gameOver = false;
    this.timer = 0;
  }

  render(deltaTime) {
    if(!this.gameOver) this.timer += deltaTime;
    this.timer =+ deltaTime;
    this.background.update();
    this.background.draw();
    this.drawStatusText();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach(obstacle => {
      obstacle.update();
      obstacle.draw();
    })
  }

  createObstacles() {
    this.obstacles = [];
    const firstX = this.baseHeight * this.ratio;
    const obstacleSpacing = 600 * this.ratio;
    for (let i = 0; i  < this.numberOfObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
    }
  }

  formatTimer() {
    return (this.timer * 0.001).toFixed(1);
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText('Score:' + this.score, this.width - 10, 30);
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Timer:' + this.timer, 10, 30);
    if (this.gameOver){
      this.ctx.textAlign = 'center';
      this.ctx.font = '30 BUngee';
      this.ctx.fillText('GAME OVER:' + this.width * 0.5, this.height * 0.5);
    }
    this.ctx.restore();
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);
  let lastTime = 0;

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.render();
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})
