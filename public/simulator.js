class QuantumParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.radius = 5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.entangled = null;
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.radius || this.x > width - this.radius) {
      this.vx *= -1;
    }
    if (this.y < this.radius || this.y > height - this.radius) {
      this.vy *= -1;
    }

    // Quantum tunneling effect
    if (Math.random() < 0.001) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    // Update entangled particle
    if (this.entangled) {
      this.entangled.x = width - this.x;
      this.entangled.y = height - this.y;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Simulator {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.isRunning = false;
  }

  addParticle() {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const particle = new QuantumParticle(x, y);

    // Quantum entanglement
    if (Math.random() < 0.3 && this.particles.length > 0) {
      const partner = this.particles[Math.floor(Math.random() * this.particles.length)];
      particle.entangled = partner;
      partner.entangled = particle;
    }

    this.particles.push(particle);
  }

  update() {
    this.particles.forEach(particle => {
      particle.update(this.canvas.width, this.canvas.height);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
      if (particle.entangled) {
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle.entangled.x, particle.entangled.y);
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.stroke();
      }
    });
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (this.isRunning) {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }
}

const canvas = document.getElementById('simulationCanvas');
const simulator = new Simulator(canvas);

document.getElementById('startStop').addEventListener('click', () => {
  if (simulator.isRunning) {
    simulator.stop();
  } else {
    simulator.start();
  }
});

document.getElementById('addParticle').addEventListener('click', () => {
  simulator.addParticle();
});

// Add initial particles
for (let i = 0; i < 10; i++) {
  simulator.addParticle();
}

simulator.start();