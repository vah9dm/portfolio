const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 200;
let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      size: 2 + Math.random() * 2.5,
    });
  }
}

function updateParticles() {
  for (let p of particles) {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Stronger pull strength for faster reaction
    let pullStrength = 0.06;
    p.vx += (dx / dist) * pullStrength;
    p.vy += (dy / dist) * pullStrength;

    // Friction
    p.vx *= 0.85;
    p.vy *= 0.85;

    p.x += p.vx;
    p.y += p.vy;

    // Bounce on edges
    if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'cyan';
    ctx.fill();
    ctx.shadowBlur = 0;

    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();
