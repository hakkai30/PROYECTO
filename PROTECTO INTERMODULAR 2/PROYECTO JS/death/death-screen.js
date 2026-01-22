document.addEventListener('DOMContentLoaded', () => {
  const introEvilLaugh = document.getElementById('introEvilLaugh');
  const bgDeathMusic   = document.getElementById('bgDeathMusic');

  introEvilLaugh.volume = 0.7;
  bgDeathMusic.volume   = 1.0;

  function initDeathAudio() {
    bgDeathMusic.currentTime = 0;
    bgDeathMusic.play().catch(() => {});

    setTimeout(() => {
      introEvilLaugh.currentTime = 0;
      introEvilLaugh.play()
      .then(() => console.log("¡Risa reproduciéndose con éxito!"))
      .catch((error) => console.error("ERROR AL REPRODUCIR RISA:", error));
    }, 500);

    document.removeEventListener('click', initDeathAudio);
    document.removeEventListener('keydown', initDeathAudio);
  }

  document.addEventListener('click', initDeathAudio);
  document.addEventListener('keydown', initDeathAudio);

  introEvilLaugh.addEventListener('ended', () => {
    introEvilLaugh.pause();
    introEvilLaugh.currentTime = 0;
  });
} );