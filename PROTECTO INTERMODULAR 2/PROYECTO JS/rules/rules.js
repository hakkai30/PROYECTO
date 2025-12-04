window.addEventListener('load', function () {
    document.body.classList.add('loaded'); // fade-in rápido
  });
  
  // por ejemplo, 25 segundos en vez de 20:
  setTimeout(function () {
    window.location.href = "/PROYECTO JS/game/game-screen.html";
  }, 15000); // 25.000 ms = 25s
  