// Lógica de carga de página para animación fade-in
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});


// =========================================================
// === I. CONFIGURACIÓN DEL JUEGO ===
// =========================================================


// Español: Frases del juego
const phrases = [
    "Haber nacido es un inconveniente tan grave que, si nos dieran a elegir, nadie aceptaría el regalo de la existencia, pues vivir no es más que el esfuerzo inútil de retrasar por unos instantes el regreso al vacío absoluto de donde nunca debimos salir.",
    "Escribe sin errores mientras el reloj avanza sin piedad, cada segundo cuenta en esta ruleta mortal.",
    "El sentido de la vida es que termina.",
    "La existencia es soportable solo como un fenómeno estético, porque si la miráramos con justicia y verdad, la fealdad del mundo nos obligaría a apartar la vista o a perder la razón de inmediato.",
    "No soy nada, nunca seré nada, no puedo querer ser nada; aparte de esto, tengo en mí todos los sueños del mundo.",
    "Todo es una asquerosidad.",
    "La vida es un estado de carencia constante.",
    "No nos une el amor sino el espanto; será por eso que la quiero tanto."
];

let availablePhrases = [...phrases];
let currentPhraseIndex = Math.floor(Math.random() * availablePhrases.length);
let textToType = availablePhrases[currentPhraseIndex];
availablePhrases.splice(currentPhraseIndex, 1);



// Diálogos del personaje
const dialogs = [
    "Esto es tu culpa, ¡ERES EL ÚNICO CULPABLE!",
    "Date prisa o todos moriran",
    "¡Escribe o muere!",
    "En tus manos estan las vidas de tus alumnos",
    "Ya que no hiciste nada por ayudarme a mi, intenta salvarlos a ellos",
    "Tu sabias lo que estaba pasando, ¿VERDAD QUE SI?",
    "No hiciste nada...",
    "SOLO NO QUERIA ESTAR SOLA..."
];
let currentDialogIndex = 0;
const DIALOG_DURATION = 5000; 
const INTERVAL_TIME = 20000; 


// Constantes de tiempo de la barra
const TOTAL_SECONDS = 180; // 3 minutos


// Estado del juego
let currentCharacterIndex = 0;
let errors = 0;
let health = 3;
let startTime = null;
let totalCharactersTyped = 0;
let isTyping = true;
let timerIntervalId = null; 
let chambersLoaded = 1;


// =========================================================
// === II. REFERENCIAS DOM ===
// =========================================================
const textDisplay = document.getElementById('text-display');
const errorCountDisplay = document.getElementById('error-count');
const cpmDisplay = document.getElementById('cpm-display');
const comicBubble = document.getElementById('comic-bubble');
const revolverChamber = document.getElementById('revolver-chamber');
const healthDisplay = document.getElementById('health-display');
const chamberSound = document.getElementById('chamberSound');
const keySound = document.getElementById('keySound');
const bgMusic = document.getElementById('bgMusic');
const emptyShotSound = document.getElementById('emptyShotSound');
const gunshotSound = document.getElementById('gunshotSound');
const CHANCE_OF_SHOT = 1 / 6;
const yandereImage = document.querySelector('.yandere-image');
let isCharacterClickable = false;

// Referencias de la barra de progreso
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');


// =========================================================
// === III. LÓGICA DE LA BARRA DE PROGRESO (3 MINUTOS) ===
// =========================================================

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function startProgressBar() {
    let timeLeft = TOTAL_SECONDS; // 180
    
    // Aseguramos estado inicial
    progressFill.style.width = '100%';
    progressLabel.textContent = formatTime(timeLeft);

    // Limpiamos cualquier intervalo previo por seguridad
    if (timerIntervalId) clearInterval(timerIntervalId);

    timerIntervalId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            
            // 1. Actualizar el texto (02:59, 02:58...)
            progressLabel.textContent = formatTime(timeLeft);
            
            // 2. Calcular y actualizar el ancho
            const percentage = (timeLeft / TOTAL_SECONDS) * 100;
            progressFill.style.width = percentage + '%';

            // 3. Cambio de color dinámico (opcional)
            if (percentage < 30) {
                progressFill.style.backgroundColor = 'rgba(255, 0, 0, 0.63)';
                progressFill.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.63))';
            }
        } else {
            // FIN DEL TIEMPO
            clearInterval(timerIntervalId);
            progressLabel.textContent = "00:00";
            progressFill.style.width = '0%';
            
            // Ejecutar derrota
            if (isTyping) {
                endGame(false, "¡El tiempo se agotó!");
            }
        }        
    }, 1000); 
}


// =========================================================
// === IV. LÓGICA DE DIÁLOGOS ===
// =========================================================

function showBubble(message, duration = DIALOG_DURATION) {
    if (!comicBubble) return;

    comicBubble.textContent = message;
    comicBubble.classList.add('show');
    isCharacterClickable = true;
    yandereImage.style.cursor = 'pointer';

    const isHelpDialog = (message === "SOLO NO QUERIA ESTAR SOLA...");

    if (comicBubble.timeoutId) {
        clearTimeout(comicBubble.timeoutId);
    }

    comicBubble.timeoutId = setTimeout(() => {
        comicBubble.classList.remove('show');
        yandereImage.style.cursor = 'default';
    }, duration);

    yandereImage.dataset.canWin = isHelpDialog;
}

function startDialogLoop() {
    // Primera ejecución
    showBubble(dialogs[currentDialogIndex], DIALOG_DURATION);

    setInterval(() => {
        // Solo lanza diálogos si el juego está activo
        if (isTyping) {
            currentDialogIndex = (currentDialogIndex + 1) % dialogs.length;
            showBubble(dialogs[currentDialogIndex], DIALOG_DURATION);
        }
    }, INTERVAL_TIME + DIALOG_DURATION); 
}

yandereImage.addEventListener('click', () => {
    const isSpeaking = comicBubble.classList.contains('show');

    if (isSpeaking) {
        if (yandereImage.dataset.canWin === "true") {
            isTyping = false;
            if (timerIntervalId) clearInterval(timerIntervalId);
        
            showBubble("Mnh-mu-muchas gracias...", 20000);
            
            setTimeout(() => {
                window.location.href = "/PROYECTO JS/second-win/second-win-screen.html";
            }, 2000);
        } 
    }
});

// =========================================================
// === V. LÓGICA DEL JUEGO DE MECANOGRAFÍA ===
// =========================================================

function initializeText() {
    textDisplay.innerHTML = '';

    textToType.split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char');
        charSpan.id = `char-${index}`;
        textDisplay.appendChild(charSpan);
    });

    currentCharacterIndex = 0;
    totalCharactersTyped = 0;
    errors = 0;
    errorCountDisplay.textContent = errors;

    const firstChar = document.getElementById('char-0');
    if (firstChar) {
        firstChar.classList.add('current');
    }
}

function loadNextPhrase() {
    if (availablePhrases.length === 0) {
        endGame(true, "Victoria"); 
        return;
    }

    currentPhraseIndex = Math.floor(Math.random() * availablePhrases.length);
    textToType = availablePhrases[currentPhraseIndex];
    availablePhrases.splice(currentPhraseIndex, 1);

    initializeText();
    isTyping = true;
}

function updateHealthDisplay() {
    healthDisplay.innerHTML = '❤️'.repeat(health) + '🤍'.repeat(3 - health);
}

// --- NUEVO: función para sonido de tecla ---
function playKeySound() {
    if (!keySound) return;

    keySound.currentTime = 0;
    keySound.volume = 0.6; // ajusta volumen a gusto
    keySound.play().catch(e => {
        console.warn("Fallo al reproducir sonido de tecla:", e);
    });
}

function playBackgroundMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.4; // Ajusta el volumen principal (0.0 a 1.0)
        bgMusic.play().catch(error => {
            console.log("El navegador bloqueó el autoplay. Esperando interacción.");
        });
    }
}

// Simula la rotación de la recámara tras un error.
function spinChamber() {
    isTyping = false;

    const probability = chambersLoaded / 6;
    const shotFired = Math.random() < probability;

    // Sonido de la recámara girando
    if (chamberSound) {
        chamberSound.currentTime = 0; 
        chamberSound.play().catch(e => console.warn("Fallo al reproducir sonido de recámara:", e));
    }

    const randomRotation = Math.random() * 360 + 1080; 
    revolverChamber.style.transition = 'transform 4s ease-out';
    revolverChamber.style.transform = `rotate(${randomRotation}deg)`;

    setTimeout(() => {
        revolverChamber.style.transition = 'none';
        revolverChamber.style.transform = '';

        if (shotFired) {
            // === CASO: DISPARO REAL (QUITA VIDA) ===
            if (gunshotSound) {
                gunshotSound.currentTime = 0;
                gunshotSound.play().catch(e => console.warn("Error en gunshot:", e));
            }

            health--;
            chambersLoaded = 1; // Se reinicia la probabilidad
            updateHealthDisplay();
            
            if (health <= 0) {
                endGame(false, "Te has quedado sin vidas.");
                return;
            } 

            // Pequeña pausa tras el susto antes de poder escribir
            setTimeout(() => { isTyping = true; }, 500);
        } 
        else {
            // === CASO: CLIC SECO (NO HUBO DISPARO) ===
            if (emptyShotSound) {
                emptyShotSound.currentTime = 0;
                emptyShotSound.play().catch(e => console.warn("Error en emptyshot:", e));
            }

            if (chambersLoaded < 6) {
                chambersLoaded++;
            }
            isTyping = true;
        }

    }, 4100);
}

function updateCPM() {
    if (startTime === null) return;
    const timeElapsed = (Date.now() - startTime) / 60000;
    const wpm = Math.round((totalCharactersTyped / 5) / timeElapsed);
    cpmDisplay.textContent = wpm || 0;
}

// Manejador de eventos de teclado.
function handleKeyInput(event) {
    if (!isTyping) {
        event.preventDefault();
        return;
    }

    if (startTime === null) {
        startTime = Date.now();
        playBackgroundMusic();
    }
    
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    const typedChar = event.key;
    const expectedChar = textToType[currentCharacterIndex];
    const currentSpan = document.getElementById(`char-${currentCharacterIndex}`);

    if (!expectedChar) {
        return;
    }

    if (typedChar === 'Backspace') {
        if (currentCharacterIndex > 0) {
            currentCharacterIndex--;
            const previousSpan = document.getElementById(`char-${currentCharacterIndex}`);
            previousSpan.classList.remove('correct', 'incorrect');
            currentSpan.classList.remove('current');
            previousSpan.classList.add('current');
        }
        event.preventDefault();
        return;
    }
    
    if (typedChar.length > 1) {
        return;
    }

    // Sonido de tecla SOLO para caracteres "reales"
    playKeySound();

    currentSpan.classList.remove('current');
    
    if (typedChar === expectedChar) {
        currentSpan.classList.add('correct');
        totalCharactersTyped++;
    } else {
        currentSpan.classList.add('incorrect');
        errors++;
        errorCountDisplay.textContent = errors;

        console.log(`ERROR ${errors}.`);

        if (errors % 5 === 0) {
            spinChamber();
        }
    }

    currentCharacterIndex++;

    if (currentCharacterIndex === textToType.length) {
        loadNextPhrase();
        return;
    
        // Si prefieres que al acabar todas las frases termine el juego, usa:
        /*
        if (currentPhraseIndex === phrases.length - 1) {
            endGame(true, "¡Has sobrevivido a todas las frases!");
        } else {
            loadNextPhrase();
        }
        return;
        */
    }
    

    const nextSpan = document.getElementById(`char-${currentCharacterIndex}`);
    if (nextSpan) {
        nextSpan.classList.add('current');
    }

    updateCPM();
    event.preventDefault();
}

function endGame(won, message) {
    isTyping = false;
    document.removeEventListener('keydown', handleKeyInput);
    if (timerIntervalId) clearInterval(timerIntervalId);
    if (bgMusic) bgMusic.pause();

    if (won) {
        window.location.href = "/PROYECTO JS/win/win-screen.html";
    } else {
        window.location.href = "/PROYECTO JS/death/death-screen.html";
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initializeText();
    updateHealthDisplay();
    startDialogLoop();
    startProgressBar();
    document.addEventListener('keydown', handleKeyInput);
});


