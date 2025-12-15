// Lógica de carga de página para animación fade-in
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});


// =========================================================
// === I. CONFIGURACIÓN DEL JUEGO ===
// =========================================================


// Español: Frases del juego
const phrases = [
    "El juego comienza ahora, concéntrate en cada letra y no des ni una sola oportunidad al error.",
    "Escribe sin errores mientras el reloj avanza sin piedad, cada segundo cuenta en esta ruleta mortal.",
    "Mantén una precisión total aunque tus manos tiemblen; un fallo puede acercarte un disparo a la cabeza.",
    "El temporizador sigue activo y no se detendrá por tus nervios, respira hondo y sigue escribiendo.",
    "Tres fallos máximo antes de tentar a la suerte; cada equivocación hace girar la recámara del revólver.",
    "¡Bang si fallas demasiadas veces! Tu vida en el juego pende de un simple carácter mal escrito.",
    "La ruleta rusa está lista y cada letra correcta te aleja un poco más del sonido del disparo.",
    "La velocidad es clave, pero la calma decide si sobrevives los tres minutos de esta prueba macabra.",
    "Comas, puntos y tildes son tus verdaderos enemigos; ignóralos y pagarás el precio con una bala virtual.",
    "La práctica constante es la clave para dominar el teclado incluso bajo presión y con el miedo respirándote en la nuca.",
    "Observa bien cada letra, evita los errores y demuestra que puedes mantener la cabeza fría bajo cualquier amenaza."
];


let currentPhraseIndex = 0;
let textToType = phrases[currentPhraseIndex];



// Diálogos del personaje
const dialogs = [
    "¡Tienes solo unos segundos! No te distraigas con mi imagen...",
    "¡Rápido, o el tiempo se acaba!",
    "¡Escribe o muere!",
    "Si cometes un error, la recamara girara...",
    "Tick Tock. ¿Estás temblando?"
];
let currentDialogIndex = 0;
const DIALOG_DURATION = 5000; 
const INTERVAL_TIME = 3000; 


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
const keySound = document.getElementById('keySound'); // NUEVO: sonido de tecla
const CHANCE_OF_SHOT = 1 / 6;

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
    let timeLeft = TOTAL_SECONDS;
    
    progressFill.style.transition = 'width 180s linear, background-color 180s linear';
    progressFill.style.width = '0%';
    progressFill.style.backgroundColor = '#000'; 
    
    progressLabel.textContent = formatTime(timeLeft);
    timeLeft--;

    timerIntervalId = setInterval(() => {
        if (timeLeft >= 0) {
            progressLabel.textContent = formatTime(timeLeft);
            timeLeft--;
        } else {
            clearInterval(timerIntervalId);
            progressLabel.textContent = "00:00";
            if (isTyping) {
                endGame(false, "¡El tiempo se agotó! No fuiste lo suficientemente rápido.");
                // Redirección a pantalla de derrota
                window.location.href = "/PROYECTO JS/death/death-screen.html";
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

    setTimeout(() => {
        comicBubble.classList.remove('show');
    }, duration);
}

function startDialogLoop() {
    showBubble(dialogs[currentDialogIndex], DIALOG_DURATION);

    setInterval(() => {
        currentDialogIndex = (currentDialogIndex + 1) % dialogs.length;
        showBubble(dialogs[currentDialogIndex], DIALOG_DURATION);
    }, INTERVAL_TIME);
}


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
    currentPhraseIndex++;
    if (currentPhraseIndex >= phrases.length) {
        // Ha terminado TODAS las frases antes de tiempo → victoria
        endGame(true, "¡Has sobrevivido a todas las frases!");
        // Redirección a pantalla de victoria
        window.location.href = "/PROYECTO JS/win/win-screen.html";
        return;
    }
    textToType = phrases[currentPhraseIndex];
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


// Simula la rotación de la recámara tras un error.
function spinChamber() {
    isTyping = false;

    const probability = chambersLoaded / 6;
    const shotFired = Math.random() < probability;

    if (chamberSound) {
        chamberSound.currentTime = 0; 
        chamberSound.play().catch(e => console.warn("Fallo al reproducir sonido de recámara:", e));
    }

    const randomRotation = Math.random() * 360 + 1080; 
    revolverChamber.style.transition = 'transform 4s ease-out';
    revolverChamber.style.transform = `rotate(${randomRotation}deg)`;

    let message;

    setTimeout(() => {
        revolverChamber.style.transition = 'none';
        revolverChamber.style.transform = '';

        if (shotFired) {
            health--;
            chambersLoaded = 1;
            updateHealthDisplay();

            message = `La recámara estaba cargada. Pierdes una vida. Te quedan ${health}.`;

            if (health <= 0) {
                isTyping = false;
                document.removeEventListener('keydown', handleKeyInput);
                if (timerIntervalId) {
                    clearInterval(timerIntervalId);
                }
                window.location.href = "/PROYECTO JS/death/death-screen.html";
                return;
            } 

            isTyping = true;
        } 
        else {
            if (chambersLoaded < 6) {
                chambersLoaded++;
            }
            message = `Clic. Tuviste suerte... La probabilidad es ahora ${chambersLoaded}/6.`;
            isTyping = true;
        }

        showBubble(message, 4000);

    }, 4100);
}


// Manejador de eventos de teclado.
function handleKeyInput(event) {
    if (!isTyping) {
        event.preventDefault();
        return;
    }

    if (startTime === null) {
        startTime = Date.now();
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

        console.log(`❌ ERROR ${errors}.`);

        if (errors % 5 === 0) {
            spinChamber();
        }
    }

    currentCharacterIndex++;

    if (currentCharacterIndex === textToType.length) {
        // Pasa a la siguiente frase en bucle
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

function updateCPM() {
    if (!startTime) return;

    const currentTime = Date.now();
    const timeElapsedInMinutes = (currentTime - startTime) / 60000;
    
    if (timeElapsedInMinutes > 0) {
        const wpm = Math.round((totalCharactersTyped / 5) / timeElapsedInMinutes); 
        cpmDisplay.textContent = wpm;
    }
}

function endGame(won, message) {
    isTyping = false;
    document.removeEventListener('keydown', handleKeyInput);
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
    }
    
    const finalTime = (Date.now() - startTime) / 60000; 
    const finalWPM = Math.round((totalCharactersTyped / 5) / finalTime);
    
    const titleColor = won ? 'text-green-400' : 'text-red-500';

    textDisplay.innerHTML = `
        <div class="end-modal text-center p-4 mx-auto my-auto mt-4" style="max-width: 400px; margin-top: 50px; text-align: center;">
            <p class="text-4xl font-bold ${titleColor} mb-4">${won ? '¡VICTORIA!' : '¡GAME OVER!'}</p>
            <p class="text-xl mb-4">${message}</p>
            <p class="text-lg">WPM final: <span class="font-extrabold text-yellow-400">${finalWPM}</span></p>
            <p class="text-md">Errores totales: <span class="text-red-400">${errors}</span></p>
            <p class="text-md">Vidas restantes: ${healthDisplay.innerHTML}</p>
            <button onclick="window.location.reload()" 
                    style="margin-top: 1.5rem; background-color: #3b82f6; color: white; font-weight: bold; padding: 0.75rem 1.5rem; border-radius: 0.5rem; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);">
                Reiniciar
            </button>
        </div>
    `;
    
    cpmDisplay.textContent = finalWPM;
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initializeText();
    updateHealthDisplay();
    startDialogLoop();
    startProgressBar();
    document.addEventListener('keydown', handleKeyInput);
});


