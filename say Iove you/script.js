// script.js
document.getElementById('showCircleBtn').addEventListener('click', function() {
    const circle = document.getElementById('circle');
    const text = document.getElementById('circleText');
    const button = document.getElementById('showCircleBtn');

    // Hide the button
    button.style.display = 'none';

    // Remove hidden class and start animation
    circle.classList.remove('hidden');
    circle.style.animation = 'zoomOut 1s forwards';

    // Wait for animation to complete then show text
    setTimeout(() => {
        text.style.opacity = 1;
        // Hide text after 10 seconds
        setTimeout(() => {
            text.style.opacity = 0;
            circle.style.animation = 'none'; // Reset animation
            circle.classList.add('hidden'); // Hide circle again
            button.style.display = 'block'; // Show the button again, if needed
        }, 10000);
    }, 1000);
});
