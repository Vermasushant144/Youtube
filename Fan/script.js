// script.js
let fanSpeed = 1;
let isRotating = false;
let direction = 1;

function toggleFan() {
    const fan = document.querySelector('.fan');
    const powerIndicator = document.getElementById('power-indicator');

    if (isRotating) {
        fan.style.animation = 'none';
        setTimeout(() => {
            fan.classList.remove('rotate');
            fan.style.animation = '';
        }, 10);
        powerIndicator.textContent = 'Power: Off';
        powerIndicator.style.color = '#d9534f';
    } else {
        fan.classList.add('rotate');
        fan.style.animationDuration = `${1 / fanSpeed}s`;
        powerIndicator.textContent = 'Power: On';
        powerIndicator.style.color = '#5cb85c';
    }

    isRotating = !isRotating;
}

function changeSpeed(value) {
    fanSpeed = value;
    const fan = document.querySelector('.fan');
    const speedValueLabel = document.getElementById('speed-value');
    speedValueLabel.textContent = value;

    if (isRotating) {
        fan.style.animationDuration = `${1 / value}s`;
    }
}

function changeDirection() {
    const fan = document.querySelector('.fan');
    direction = -direction;
    fan.style.animationDirection = direction === 1 ? 'normal' : 'reverse';
}
