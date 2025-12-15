// /PROYECTO JS/death/death-audio.js

document.addEventListener('DOMContentLoaded', () => {
  const introEvilLaugh = document.getElementById('introEvilLaugh'); // risa chica malvada
  const bgDeathMusic   = document.getElementById('bgDeathMusic');   // música ambiente bucle

  // Volúmenes
  introEvilLaugh.volume = 3.0;
  bgDeathMusic.volume   = 0.3;

  // Intento silencioso por si el navegador lo permite
  bgDeathMusic.play().catch(() => {});

  function initDeathAudio() {
    // Empezar música de fondo en bucle inmediatamente tras el gesto
    bgDeathMusic.currentTime = 0;
    bgDeathMusic.play().catch(() => {});

    // Retrasar la risa malvada X segundos (ej: 3000 ms = 3 s)
    const DELAY_MS = 5000; // cambia este valor a lo que quieras
    setTimeout(() => {
      introEvilLaugh.currentTime = 0;
      introEvilLaugh.play().catch(() => {});
    }, DELAY_MS);

    // Solo una vez
    document.removeEventListener('click', initDeathAudio);
    document.removeEventListener('keydown', initDeathAudio);
  }

  // Primer gesto del usuario → activa audio
  document.addEventListener('click', initDeathAudio);
  document.addEventListener('keydown', initDeathAudio);

  // Cuando termine la risa, no se repite
  introEvilLaugh.addEventListener('ended', () => {
    introEvilLaugh.pause();
    introEvilLaugh.currentTime = 0;
  });
});

  