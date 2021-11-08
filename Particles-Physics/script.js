const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 45;
let hue = 0;

let titleElement = document.getElementById('title1');
let titleMeasurements = titleElement.getBoundingClientRect();
// Getting the location of the title
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
}


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 28;
        this.weight = Math.random() * 1 + 1;
        this.directionX = Math.random() * -3 + 1;
        this.color = 'hsl(' + hue + ',100%, 50%)'
    }
    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
        // Collision Check between particles and title elements
        if (this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y) {
            this.y -= 3;
            this.weight *= -0.75;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'darkgray';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;


        ctx.beginPath();
        // Tells JS to begin drawing
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
function init() {
    particlesArray = []
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y))
        hue += 50

    }
}
init();


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // For Leaving Trails
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

    }
    // ctx.fillRect(title.x, title.y, title.width, title.height);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10,
    }
    init();
})