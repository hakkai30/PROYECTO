// Variable para almacenar el ID del temporizador y poder cancelarlo
let rulesScreenTimerId = null; 

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    const intro = document.getElementById('intro-video');
    const gameContent = document.getElementById('game-content'); 

    if (video) {
        video.addEventListener('ended', () => {
            intro.style.display = 'none';
            gameContent.style.display = 'block';
        });
    }

    // --- Referencias Principales SPA ---
    const backgroundMusic = document.getElementById('musicaFondo');
    const audioControlButton = document.getElementById('audioControl');
    
    // Pantallas
    const startScreen = document.getElementById('startScreen');
    const rulesScreen = document.getElementById('rulesScreen');

    // Botones
    const startButton = document.getElementById('startButton'); 
    const backButton = document.getElementById('backToStartButton');
    const playGameButton = document.getElementById('playGameButton'); // Corregido ID

    if (!backgroundMusic || !audioControlButton || !startButton || !rulesScreen || !startScreen) {
        return;
    }

    // LÓGICA DE AUDIO (Inicia Silenciado)
    
    const updateIcon = () => {
        audioControlButton.textContent = backgroundMusic.muted ? '🔇' : '🔊';
    };

    const startMutedPlayback = () => {
        backgroundMusic.muted = true; 
        backgroundMusic.play().catch(error => {
            console.warn("Fallo al iniciar el audio silenciado. Esperando interacción.");
        });
    };

    startMutedPlayback();
    updateIcon();

    audioControlButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.error("Fallo al intentar reproducir después de click:", e));
        }
        backgroundMusic.muted = !backgroundMusic.muted;
        updateIcon();
    });

    // LÓGICA DE NAVEGACIÓN Y TEMPORIZADOR SPA
    
    // Función para manejar la navegación a la pantalla del juego
    const goToGameScreen = () => {
        window.location.href = "/PROYECTO JS/game/game-screen.html";
    };

    // Función para iniciar la cuenta regresiva de 10 segundos
    const startRulesTimer = () => {
        rulesScreenTimerId = setTimeout(goToGameScreen, 10000); 
        console.log("Temporizador iniciado. Redirigiendo en 20 segundos.");
    };

    // Función para detener la cuenta regresiva
    const stopRulesTimer = () => {
        if (rulesScreenTimerId !== null) {
            clearTimeout(rulesScreenTimerId);
            rulesScreenTimerId = null;
            console.log("Temporizador detenido.");
        }
    };


    const navigateTo = (targetScreen) => {
        // Ocultar ambas pantallas
        startScreen.style.display = 'none';
        rulesScreen.style.display = 'none';

        // Mostrar la pantalla objetivo
        targetScreen.style.display = 'block';

        // Lógica de Audio (solo para START y RULES)
        if (targetScreen === rulesScreen) {
            if (backgroundMusic.muted) {
                backgroundMusic.muted = false;
                updateIcon(); 
            }
            // INICIAR EL TEMPORIZADOR AL ENTRAR A LAS REGLAS
            startRulesTimer();
        } else {
            // DETENER EL TEMPORIZADOR AL SALIR DE LAS REGLAS
            stopRulesTimer();
        }
    };

    // 1. De Inicio a Reglas (START GAME)
    startButton.addEventListener('click', () => {
        navigateTo(rulesScreen);
    });

    // 2. De Reglas a Inicio (VOLVER)
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateTo(startScreen);
        });
    }

    // 3. De Reglas a Jugar (CLIC MANUAL)
    if (playGameButton) {
        playGameButton.addEventListener('click', () => {
            stopRulesTimer(); 
            goToGameScreen();
        });
    }
});