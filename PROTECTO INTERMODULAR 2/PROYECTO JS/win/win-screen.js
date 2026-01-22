document.addEventListener('DOMContentLoaded', () => {
    const bgWinMusic = document.getElementById('bgWinMusic');
    bgWinMusic.volume = 0.35;
  
    bgWinMusic.play().catch(() => {});
  
    function startWinMusic() {
      bgWinMusic.currentTime = 0;
      bgWinMusic.play().catch(() => {});
  
      document.removeEventListener('click', startWinMusic);
      document.removeEventListener('keydown', startWinMusic);
    }
  
    document.addEventListener('click', startWinMusic);
    document.addEventListener('keydown', startWinMusic);
  });
  