// Lógica de carga de página para animación fade-in
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// =========================================================
// === I. CONFIGURACIÓN DEL JUEGO ===
// =========================================================

// Español: Definición del texto a transcribir
const textToType = `La práctica constante es la clave para dominar el teclado. 
Observa bien cada letra y evita los errores para mejorar tu velocidad de escritura.`;

// Diálogos del personaje
const dialogs = [
    "¡Tienes solo unos segundos! No te distraigas con mi imagen...",
    "¡Rápido, o el tiempo se acaba!",
    "¡Escribe o muere!",
    "Si cometes un error, la recamara girara...",
    "Tick Tock. ¿Estás temblando?"
];
let currentDialogIndex = 0;
const DIALOG_DURATION = 5500; 
const INTERVAL_TIME = 30000;   

// Constantes de tiempo de la barra
const TOTAL_SECONDS = 180; // 3 minutos

// Estado del juego
let currentCharacterIndex = 0;
let errors = 0;
let health = 3;
let startTime = null;
let totalCharactersTyped = 0;
let isTyping = false;
let timerIntervalId = null; // Para el temporizador de la barra

// =========================================================
// === II. REFERENCIAS DOM ===
// =========================================================
const textDisplay = document.getElementById('text-display');
const errorCountDisplay = document.getElementById('error-count');
const cpmDisplay = document.getElementById('cpm-display');
const comicBubble = document.getElementById('comic-bubble');
const revolverChamber = document.getElementById('revolver-chamber');
const healthDisplay = document.getElementById('health-display');

// Referencias de la barra de progreso
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');

// =========================================================
// === III. LÓGICA DE LA BARRA DE PROGRESO (3 MINUTOS) ===
// =========================================================

/**
 * Función que formatea segundos a formato MM:SS.
 */
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Inicia el temporizador de 3 minutos y la animación de la barra.
 */
function startProgressBar() {
    let timeLeft = TOTAL_SECONDS;
    
    // 1. Iniciar la animación CSS (Vaciarse 100% -> 0% en 180s y color a negro)
    // El CSS maneja la transición de width, aquí solo ajustamos la transición
    progressFill.style.transition = 'width 180s linear, background-color 180s linear';
    progressFill.style.width = '0%';
    progressFill.style.backgroundColor = '#000'; 
    
    // 2. Iniciar el temporizador JS para actualizar la etiqueta de texto:
    progressLabel.textContent = formatTime(timeLeft);
    timeLeft--;

    timerIntervalId = setInterval(() => {
        if (timeLeft >= 0) {
            progressLabel.textContent = formatTime(timeLeft);
            timeLeft--;
        } else {
            clearInterval(timerIntervalId);
            progressLabel.textContent = "00:00";
            // Si el tiempo se acaba, es fin de juego (Derrota por tiempo)
            if (isTyping) {
                endGame(false, "¡El tiempo se agotó! No fuiste lo suficientemente rápido.");
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

/**
 * Inicializa y prepara el texto para el juego.
 */
function initializeText() {
    textDisplay.innerHTML = '';
    textToType.split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char');
        charSpan.id = `char-${index}`;
        textDisplay.appendChild(charSpan);
    });
    // Resaltar el primer carácter
    const firstChar = document.getElementById('char-0');
    if (firstChar) {
        firstChar.classList.add('current');
    }
    
    // Iniciar el loop de diálogos y el temporizador
    startDialogLoop();
    startProgressBar();
}

/**
 * Actualiza el display de vidas (corazones).
 */
function updateHealthDisplay() {
    healthDisplay.innerHTML = '❤️'.repeat(health) + '🤍'.repeat(3 - health);
}

/**
 * Simula la rotación de la recámara tras un error.
 */
function spinChamber() {
    // Un error hace girar la recámara. Esto es solo visual.
    const randomRotation = Math.random() * 360 + 720; // Gira al menos 2 veces
    revolverChamber.style.transition = 'transform 0.5s ease-out';
    revolverChamber.style.transform = `rotate(${randomRotation}deg)`;

    // Eliminar la transición después para preparar el siguiente giro
    setTimeout(() => {
        revolverChamber.style.transition = 'none';
        revolverChamber.style.transform = '';
    }, 600);
}

/**
 * Manejador de eventos de teclado.
 */
function handleKeyInput(event) {
    if (!isTyping) {
        startTime = Date.now();
        isTyping = true;
    }
    
    // Ignorar teclas de control, Alt, etc.
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    const typedChar = event.key;
    const expectedChar = textToType[currentCharacterIndex];
    const currentSpan = document.getElementById(`char-${currentCharacterIndex}`);

    if (!expectedChar) {
        return;
    }

    // Manejo de la tecla Retroceso (Permite corregir errores inmediatamente)
    if (typedChar === 'Backspace') {
        if (currentCharacterIndex > 0) {
            currentCharacterIndex--;
            const previousSpan = document.getElementById(`char-${currentCharacterIndex}`);
            
            // Resetear el estado del span anterior
            previousSpan.classList.remove('correct', 'incorrect');
            
            // Resaltar la posición actual (que ahora es el anterior)
            currentSpan.classList.remove('current');
            previousSpan.classList.add('current');
        }
        event.preventDefault(); // Evitar el comportamiento del navegador
        return;
    }
    
    // Comprobación de carácter normal
    if (typedChar.length > 1) {
        return; // Ignorar otras teclas especiales (Shift, Enter, etc.)
    }
    
    // Remover el resaltado de posición actual
    currentSpan.classList.remove('current');
    
    // 1. Manejo de pulsación (Correcto o Incorrecto)
    if (typedChar === expectedChar) {
        currentSpan.classList.add('correct');
        totalCharactersTyped++;
    } else {
        // Penalización por error
        currentSpan.classList.add('incorrect');
        errors++;
        errorCountDisplay.textContent = errors;
        
        // Penalización de Salud (ejemplo: 1 de salud por cada 5 errores)
        if (errors % 5 === 0) {
            health--;
            updateHealthDisplay();
            spinChamber(); // Efecto visual
            showBubble(`¡Cuidado! Solo te quedan ${health} vidas.`, 3000);
            
            if (health <= 0) {
                endGame(false, "¡Demasiados errores! La recámara estaba cargada...");
                return;
            }
        }
    }

    // 2. Mover al siguiente carácter
    currentCharacterIndex++;

    // 3. Revisar si el texto ha terminado
    if (currentCharacterIndex === textToType.length) {
        endGame(true, "¡Has terminado a tiempo! Vives para luchar otro día.");
        return;
    }

    // 4. Resaltar el nuevo carácter actual
    const nextSpan = document.getElementById(`char-${currentCharacterIndex}`);
    if (nextSpan) {
        nextSpan.classList.add('current');
    }
    
    // 5. Actualizar CPM
    updateCPM();
    
    event.preventDefault(); 
}

/**
 * Calcula y actualiza los caracteres por minuto (CPM).
 */
function updateCPM() {
    if (!startTime) return;

    const currentTime = Date.now();
    const timeElapsedInMinutes = (currentTime - startTime) / 60000;
    
    if (timeElapsedInMinutes > 0) {
        // Se usa 5 para WPM (Words Per Minute) pero se mantiene la etiqueta CPM del HTML anterior
        const wpm = Math.round((totalCharactersTyped / 5) / timeElapsedInMinutes); 
        cpmDisplay.textContent = wpm;
    }
}

/**
 * Función que se ejecuta al finalizar la prueba de mecanografía.
 * @param {boolean} won - Si el jugador ganó.
 * @param {string} message - Mensaje de resultado.
 */
function endGame(won, message) {
    isTyping = false;
    document.removeEventListener('keydown', handleKeyInput);
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
    }
    
    const finalTime = (Date.now() - startTime) / 60000; 
    // Usamos WPM (palabras por minuto) que es más estándar (caracteres / 5)
    const finalWPM = Math.round((totalCharactersTyped / 5) / finalTime);
    
    const titleColor = won ? 'text-green-400' : 'text-red-500';

    // Construcción del modal de fin de juego
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
    // Añadir el listener al documento para capturar todas las pulsaciones
    document.addEventListener('keydown', handleKeyInput);
});