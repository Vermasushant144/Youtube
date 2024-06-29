document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('flag-colors');
        document.getElementById('text1').classList.add('hidden');
        document.getElementById('text2').classList.remove('hidden');
    }, 4000); // 4 seconds delay to match the animation timing
});