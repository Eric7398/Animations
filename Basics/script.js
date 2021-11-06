const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = 'white';
    // ctx.fillRect(10, 10, 50, 50);
    //fillRect is 4 args x/y location, width/height
})
// Proper resizing of browser it keeps refreshing for everytime it gets resized

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function (event) {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());

    }
    // Allows global update of mouse location based on click event

    console.log(mouse)
})

canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 1; i++) {
        particlesArray.push(new Particle());

    }

})

// function drawCircle() {

//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
//     ctx.fill();
//     // x, y, Radius, Loction of Circle Start, 360 degrees so it's a full circle
// }

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;

        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ',100%, 50%)'
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.075;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new Particle())
//     }
// }
// init();

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color
                ctx.lineWidth = 3
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            console.log(particlesArray.length)
            i--;
        }
    }
}
console.log(particlesArray)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.05)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Adding Trails
    handleParticles();
    hue += 1.5;
    requestAnimationFrame(animate);
}

animate();


