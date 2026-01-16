// /PROYECTO JS/win/win-audio.js

document.addEventListener('DOMContentLoaded', () => {
    const bgWinMusic = document.getElementById('bgWinMusic');
  
    // Volumen suave de fondo
    bgWinMusic.volume = 0.35;
  
    // Intento silencioso de reproducir (por si el navegador lo permite ya)
    bgWinMusic.play().catch(() => { /* probablemente bloqueado por autoplay */ });
  
    function startWinMusic() {
      bgWinMusic.currentTime = 0;
      bgWinMusic.play().catch(() => {});
  
      // Eliminamos listeners para que solo se ejecute una vez
      document.removeEventListener('click', startWinMusic);
      document.removeEventListener('keydown', startWinMusic);
    }
  
    // Primer gesto del usuario → empieza la música de victoria en bucle
    document.addEventListener('click', startWinMusic);
    document.addEventListener('keydown', startWinMusic);
  });
  