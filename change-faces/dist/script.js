const emojiElement = document.getElementById('emoji');

emojiElement.addEventListener('mouseover', function() {
    this.textContent = '😔';
});

emojiElement.addEventListener('mouseout', function() {
    this.textContent = '😊';
});