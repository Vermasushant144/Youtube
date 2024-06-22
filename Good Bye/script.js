document.getElementById('revealButton').addEventListener('click', function() {
    const message = document.querySelector('.message');
    message.style.opacity = 1;
    message.style.transform = 'translateY(0)';

    // Play cheer sound
    const cheerSound = document.getElementById('cheerSound');
    cheerSound.play();

    // Start confetti and particles animation
    startConfetti();
    startParticles();
});

function startConfetti() {
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    const confettiPieces = [];

    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createConfettiPiece() {
        return {
            x: randomRange(0, confettiCanvas.width),
            y: randomRange(-confettiCanvas.height, 0),
            size: randomRange(5, 10),
            speed: randomRange(2, 5),
            angle: randomRange(0, Math.PI * 2),
            color: `hsl(${randomRange(0, 360)}, 100%, 50%)`
        };
    }

    function drawConfettiPiece(piece) {
        ctx.save();
        ctx.fillStyle = piece.color;
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.angle);
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();
    }

    function updateConfettiPiece(piece) {
        piece.y += piece.speed;
        piece.angle += piece.speed * 0.05;
        if (piece.y > confettiCanvas.height) {
            piece.y = -piece.size;
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach(drawConfettiPiece);
        confettiPieces.forEach(updateConfettiPiece);
        requestAnimationFrame(animateConfetti);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 200; i++) {
        confettiPieces.push(createConfettiPiece());
    }

    animateConfetti();
}

function startParticles() {
    const particlesCanvas = document.getElementById('particlesCanvas');
    const ctx = particlesCanvas.getContext('2d');
    const particles = [];

    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle() {
        return {
            x: randomRange(0, particlesCanvas.width),
            y: randomRange(0, particlesCanvas.height),
            size: randomRange(2, 4),
            speedX: randomRange(-1, 1),
            speedY: randomRange(-1, 1),
            color: `rgba(255, 255, 255, ${randomRange(0.5, 1)})`
        };
    }

    function drawParticle(particle) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    }

    function updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > particlesCanvas.width) {
            particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > particlesCanvas.height) {
            particle.speedY = -particle.speedY;
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach(drawParticle);
        particles.forEach(updateParticle);
        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 100; i++) {
        particles.push(createParticle());
    }

    animateParticles();
}
