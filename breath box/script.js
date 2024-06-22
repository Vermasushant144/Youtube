// script.js
const canvas = document.getElementById('breathingCanvas');
const ctx = canvas.getContext('2d');

const size = 200;
canvas.width = size;
canvas.height = size;

const duration = 4000; // Duration for each side in milliseconds
const steps = [
    { label: 'inhale', duration: duration },
    { label: 'hold1', duration: duration },
    { label: 'exhale', duration: duration },
    { label: 'hold2', duration: duration }
];

const sideLength = size - 20;
const halfSideLength = sideLength / 2;
const offset = 10;
let stepIndex = 0;
let startTime;

function animate(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const step = steps[stepIndex];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    // Draw the square
    ctx.strokeRect(offset, offset, sideLength, sideLength);
    
    const progress = Math.min(elapsed / step.duration, 1);
    
    // Calculate the position
    let x, y;
    if (stepIndex === 0) {
        x = offset + sideLength * progress;
        y = offset;
    } else if (stepIndex === 1) {
        x = offset + sideLength;
        y = offset + sideLength * progress;
    } else if (stepIndex === 2) {
        x = offset + sideLength * (1 - progress);
        y = offset + sideLength;
    } else {
        x = offset;
        y = offset + sideLength * (1 - progress);
    }
    
    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'lime';
    ctx.fill();
    
    if (progress === 1) {
        startTime = time;
        stepIndex = (stepIndex + 1) % steps.length;
        updateLabels();
    }
    
    requestAnimationFrame(animate);
}

function updateLabels() {
    document.getElementById('inhale').style.visibility = stepIndex === 0 ? 'visible' : 'hidden';
    document.getElementById('hold1').style.visibility = stepIndex === 1 ? 'visible' : 'hidden';
    document.getElementById('exhale').style.visibility = stepIndex === 2 ? 'visible' : 'hidden';
    document.getElementById('hold2').style.visibility = stepIndex === 3 ? 'visible' : 'hidden';
}

// Start the animation
updateLabels();
requestAnimationFrame(animate);
