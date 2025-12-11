# PROJECTE 2 – ENTREGA 3  
## Enginyeria inversa de codi

- **Mòdul:** M0616 – Projecte de desenvolupament web [
- **Alumnes:** *Robin i Fabio*  

## 1. Joc analitzat

- **Nom del joc:** JS Typing Game  
- **Enllaç al repositori:** https://github.com/dejwid/js-typing-game 
- **Tecnologies principals:** HTML, CSS i JavaScript vanilla (`index.html`, `styles.css`, `typing.js`). 
- **Breu descripció del joc:** És un joc de mecanografia on l’usuari té 30 segons per escriure correctament el màxim nombre possible de paraules que apareixen a la pantalla, i al final es mostra la puntuació i les paraules/minut aproximades. 

## 2. Variables d’estat del joc

Les principals variables d’estat estan definides a `typing.js` i controlen el temps, el conjunt de paraules i la sessió de joc. 

- **Conjunt de paraules i comptador:**
  - `const words = '...'.split(' ')`: array amb totes les paraules que es poden mostrar durant la partida. 
  - `const wordsCount = words.length;`: longitud de l’array de paraules, usada per seleccionar paraules aleatòries. 

- **Temps i sessió:**
  - `const gameTime = 30 * 1000;`: durada total de la partida en mil·lisegons (30 segons). 
  - `window.timer = null;`: referència al temporitzador actiu (interval o timeout) perquè es pugui iniciar/aturar. 
  - `window.gameStart = null;`: marca el moment d’inici del joc per calcular el temps transcorregut i restant. 
  - `window.pauseTime = 0;`: acumula el temps que el joc ha estat en pausa o fora de focus, per compensar el temporitzador. 

- **Estat visual i DOM (a partir de funcions):**
  - A través de `addClass` i `removeClass` es gestiona l’estat de focus, error i paraula actual al DOM, encara que no hi hagi un objecte d’estat gran, sinó estat repartit en classes dels elements. 

## 3. Funcions que canvien l’estat

Diverses funcions de `typing.js` modifiquen l’estat lògic del joc (temps, paraules mostrades, puntuació). 

- **Gestió de classes (estat visual):**
  - `function addClass(el, name) { ... }` i `function removeClass(el, name) { ... }`: afegeixen o eliminen cadenes de classe en els elements per reflectir estat com “focus”, “correcte/incorrecte” o “paraula activa”. 

- **Selecció de paraules i format:**
  - `function randomWord() { ... }`: tria una paraula aleatòria de l’array `words` utilitzant un índex aleatori.  
  - `function formatWord(word) { ... }`: crea la representació HTML de cada paraula dividida en lletres, encapsulant cada lletra en un `<span>` amb classe per poder marcar lletres correctes/incorrectes.   

- **Inici i reinici del joc (funcions del bucle):**
  - Funcions (no visibles senceres al fragment, però típicament anomenades tipus `startGame`, `resetGame`, etc.) que:
    - Inicialitzen `window.gameStart` amb el temps actual.  
    - Reinicien el marcador i el panell de paraules.  
    - Configuren el temporitzador basat en `gameTime` i guarden la referència a `window.timer`. 

- **Actualització de puntuació:**
  - El *handler* de teclat incrementa el nombre de paraules correctes i paraules totals quan l’usuari premsa espai (fi de paraula), actualitzant l’estat intern i el DOM (marcador).   

## 4. Interacció amb el DOM

El joc treballa intensament amb el DOM per pintar paraules, marcar les lletres correctes/incorrectes i mostrar informació de temps i puntuació.   

- **Repintat de paraules:**
  - La zona principal del joc conté les paraules generades amb `formatWord(word)`, i aquestes s’insereixen com a HTML dins d’un contenidor del `index.html`.   
  - Cada lletra és un `<span class="letter">` de manera que les funcions de lògica poden afegir classes de “correcte/incorrecte” lletra a lletra.   

- **Actualització d’informació de joc:**
  - Elements amb id relacionats amb el temps, puntuació i estat són actualitzats (textContent/innerHTML) quan canvia l’estat (paraula completada, error, temps restant).   
  - El joc també canvia classes en el contenidor principal per mostrar si el joc està en focus (borros/clar) mitjançant CSS (`filter: blur` quan no està en focus).   

## 5. Funció que controla el flux del joc

El flux general del joc es basa en una funció d’inici i en un temporitzador que va reduint el temps i acaba la partida.   

- **Inici de partida:**
  - La funció d’inici del joc (definida a `typing.js`) assigna `window.gameStart` al temps actual, genera el primer conjunt de paraules i engega el temporitzador amb `gameTime`.   
  - També s’encarrega de netejar estat anterior (puntuació, classes al DOM) per fer un “reset” complet cada vegada que es reinicia el joc.   

- **Bucle i final:**
  - El temporitzador comprova periòdicament el temps restant i, quan arriba a zero, atura el joc, desactiva l’entrada de teclat i mostra el resultat final.   
  - Aquest flux és lineal: inici → compte enrere → fi i càlcul de paraules/minut (WPM).   

## 6. Esdeveniments i handlers

El joc fa servir sobretot esdeveniments de teclat i focus per controlar l’entrada de l’usuari i l’estat de pausa.   

- **Teclat:**
  - `keydown` sobre el contenidor del joc (gràcies a `tabindex="0"` a l’element principal en `index.html`).   
  - *Handler principal*:
    - Comprova la tecla premuda.  
    - Compara amb la lletra esperada de la paraula actual.  
    - Marca la lletra com a correcta/incorrecta al DOM.  
    - Quan l’usuari prem espai, dona per acabada la paraula, actualitza puntuació i passa a la següent.   

- **Focus/blur del joc:**
  - Esdeveniments de focus/blur sobre l’element principal del joc; el *handler* activa/desactiva el borros de les paraules i ajusta `window.pauseTime` per no penalitzar el temps quan la finestra perd focus.   

- **Botó de reinici:**
  - `click` sobre el botó de reinici definit a `index.html`, que crida la funció de `reset/start` per començar una nova partida.   

## 7. Temporització del joc

El control del temps és una part clau del joc i es gestiona amb les APIs de temporització de JavaScript.   

- **Mecànica principal de temps:**
  - `gameTime = 30 * 1000` defineix la durada de la partida.   
  - S’utilitza un temporitzador (per exemple `setInterval` o `setTimeout` combinat amb càlcul de diferències de temps) per reduir el temps restant i per actualitzar el marcador visual del compte enrere.   

- **Gestió de pausa:**
  - `window.pauseTime` guarda el temps acumulat en què el joc està en pausa (sense focus), de manera que en reprendre es recalcula correctament el temps que queda.   

## 8. Gestió de les animacions

Les “animacions” del joc són sobretot visuals i basades en canvis de classes CSS més que en un motor d’animació complex.   

- **Efectes de focus:**
  - El text de les paraules té un `filter: blur(5px)` per defecte i, quan el joc està en focus, es canvia a `filter: blur(0)` mitjançant una classe CSS aplicada des de JavaScript.   

- **Feedback de tecleig:**
  - Cada lletra s’encapsula en un `<span>` i, segons el resultat de l’entrada, se li afegeixen classes que canvien el color o estil per indicar encerts i errors.   
  - No es fa servir `requestAnimationFrame`, sinó que el moviment/feedback és discret (per esdeveniment) i gestionat via CSS.   

## 9. Col·lisions

Aquest joc no té col·lisions físiques com un joc d’acció, però sí “col·lisions lògiques” entre l’entrada de l’usuari i la lletra esperada.   

- **Comparació de lletres:**
  - El *handler* de teclat compara cada tecla premuda amb el caràcter esperat de la paraula actual i marca visualment l’error o l’encert.   
  - Quan l’usuari arriba al final de la paraula o prem espai, es considera “col·lisió” amb el final de paraula i s’actualitza la puntuació i es genera una nova paraula.   

## 10. Documentació existent

El repositori té una descripció bàsica a GitHub i està acompanyat d’un vídeo-tutorial a YouTube que explica pas a pas com es construeix el joc.   

- **README / descripció:** al repositori hi ha una descripció breu del projecte (“Contribute to dejwid/js-typing-game…”), però no una documentació tècnica molt extensa.   
- **Documentació d’usuari:** el vídeo de YouTube mostra clarament com funciona el joc, la interfície i els controls, i serveix com a guia tant per a l’usuari com per al desenvolupador que vol entendre el codi.   

## 11. Conclusions personals

- Les tècniques més interessants per reutilitzar al meu joc són la generació de paraules aleatòries, la divisió de cada paraula en `<span>`s lletra a lletra i la gestió del temps amb compensació de pausa (`pauseTime`).   
- També destaca la forma senzilla d’estructurar el joc sense frameworks, només amb HTML, CSS i JS, cosa que fa el codi fàcil d’entendre i d’adaptar per a un altre gènere de videojoc en el navegador.   
- A nivell de complexitat tècnica, el punt més delicat és mantenir sincronitzats el temps real, l’estat visual del joc i el tractament dels esdeveniments de teclat sense que es desquadri la lògica (especialment amb focus/blur i reinicis).   

Tema de frases no copiarem ninguna, sino que ho crearem nosaltres y seran frases més curtes, i posarem un temps determinat per escriure frases. Aixó sí, nosaltres posarem 3 vides, i després d'aixó es faría com un random, ja que es giraría una càmera d'un revolver que es mostrará en pantalla, així d'un estil joc de la "Ruleta Rusa", i depenent si toca la bala o no, s'acabaría el joc o es segueix jugant fins que passin 3 mins.
