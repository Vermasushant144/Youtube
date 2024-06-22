document.getElementById('flyButton').addEventListener('click', function() {
    const airplane = document.getElementById('airplane');

    // Reset the position and remove transition if it exists
    airplane.style.transition = 'none';
    airplane.style.left = '-160px';
    airplane.style.top = '50%';

    // Trigger a reflow to restart the animation
    airplane.offsetHeight; // This line forces the reflow

    // Apply the transition after the reflow
    airplane.style.transition = 'left 10s linear, top 10s ease-in-out';

    // Calculate a random top position for the airplane to end at
    const randomTop = Math.random() * 80 + 10; // Random number between 10% and 90%
    airplane.style.left = '100%';
    airplane.style.top = randomTop + '%';
});

document.getElementById('stopButton').addEventListener('click', function() {
    const airplane = document.getElementById('airplane');
    // Stop the airplane by removing the transition and keeping its current position
    const computedStyle = window.getComputedStyle(airplane);
    airplane.style.transition = 'none';
    airplane.style.left = computedStyle.left;
    airplane.style.top = computedStyle.top;
});
