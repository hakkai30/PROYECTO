document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    const intro = document.getElementById('intro-video');
    const game = document.getElementById('game-content');

    if (!video) return;

    video.addEventListener('ended', () => {
        intro.style.display = 'none';
        game.style.display = 'block';
    });
});
