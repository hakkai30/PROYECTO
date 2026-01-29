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

    const backgroundMusic = document.getElementById('musicaFondo');
    const audioControlButton = document.getElementById('audioControl');
    const startScreen = document.getElementById('startScreen');
    const rulesScreen = document.getElementById('rulesScreen');
    const startButton = document.getElementById('startButton'); 
    const backButton = document.getElementById('backToStartButton');
    const playGameButton = document.getElementById('playGameButton');

    if (!backgroundMusic || !audioControlButton || !startButton || !rulesScreen || !startScreen) {
        return;
    }

    // LÓGICA DE AUDIO 
    
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
    
    const goToGameScreen = () => {
        window.location.href = "game/game-screen.html";
    };

    // Función para iniciar la cuenta regresiva de 10 segundos
    const startRulesTimer = () => {
        rulesScreenTimerId = setTimeout(goToGameScreen, 30000); 
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
        startScreen.style.display = 'none';
        rulesScreen.style.display = 'none';
        targetScreen.style.display = 'block';

        // Lógica de Audio 
        if (targetScreen === rulesScreen) {
            if (backgroundMusic.muted) {
                backgroundMusic.muted = false;
                updateIcon(); 
            }
            startRulesTimer();
        } else {
            stopRulesTimer();
        }
    };

    startButton.addEventListener('click', () => {
        navigateTo(rulesScreen);
    });

    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateTo(startScreen);
        });
    }

    if (playGameButton) {
        playGameButton.addEventListener('click', () => {
            stopRulesTimer(); 
            goToGameScreen();
        });
    }
});