/* ------ JavaScript - UI Animation - Fire ------ */

/* =============== Get DOM Elements =============== */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =============== Measuring Buttons =============== */

const buttonElements = document.querySelectorAll(".button");
let buttonMeasurements = [];
function measureButtons() {
  buttonMeasurements = [];
  buttonElements.forEach((button) => {
    buttonMeasurements.push(button.getBoundingClientRect());
  });
}
measureButtons();
console.log(buttonMeasurements);

/* =============== Create Particles =============== */

let particlesArray = [];
class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = Math.random() * 1.5 + 1.5;
    this.directionX = Math.random() * 5;
  }
  update() {
    this.y -= this.weight; // This will make particles move upwards.
    this.x += this.directionX; // This will make particles move towards screen right.
    // Need to make sure that the particles size is above 0.
    if (this.size >= 0.3) this.size -= 0.3;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
  }
}

let activeButton = -1;
buttonElements.forEach((button) =>
  button.addEventListener("mouseenter", function () {
    activeButton = button.dataset.number;
  })
);
buttonElements.forEach((button) =>
  button.addEventListener("mouseleave", function () {
    activeButton = -1;
  })
);

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 1) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}
function createParticle() {
  if (activeButton > -1) {
    let size = Math.random() * 40 + 7; // 40 + 10;
    let x =
      Math.random() * (buttonMeasurements[activeButton].width - size * 2) +
      buttonMeasurements[activeButton].x +
      size;
    let y = buttonMeasurements[activeButton].y + 40;
    particlesArray.push(new Particle(x, y, size));
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createParticle();
  handleParticles();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  measureButtons();
});
