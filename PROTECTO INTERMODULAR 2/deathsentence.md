# Death Sentence – Documentación del videojuego

Juego de supervivencia y escritura rápida, ambientado en una atmósfera de tensión y azar.

---

## 1. Estilos gráficos básicos

### Tipografía

- Principal:  
  `font-family: 'Josefin Slab', serif;`
- Alternativa:  
  `font-family: 'Ojuju', sans-serif;`
- Monoespaciada (añadida):  
  `font-family: 'Courier New', monospace;`

### Paleta de colores

| Elemento                  | Color    | Descripción           |
|---------------------------|----------|-----------------------|
| Fondo hoja (fondo frases) | #FFFFFA  | Casi blanco           |
| Frase objetivo            | #40434E  | Gris oscuro           |
| Texto en escritura        | #080705  | Negro intenso         |
| Texto erróneo             | #702632  | Burdeos oscuro        |

---

## 1.1. Pantalla de inicio (`style-start-screen.css`)

**Tipografía:**  
`font-family: 'Josefin Slab', serif;`

**Fondo general:**  
`background: url("./assets/inicio.webp") no-repeat center/cover;`  
*(imagen de fondo)*

**Texto del título (`h1`):**  
- Color: `rgb(79, 14, 14)` (rojo oscuro)
- Sombra de texto (`text-shadow`):  
`8px 4px 6px #000;` (negro)

---

## 1.2. Pantalla de reglas (`style-rules-screen.css`)

**Tipografía:**  
`font-family: 'Josefin Slab', serif;`

**Fondo general:**  
`background: url("./assets/tvantigua.png") no-repeat center/cover;`  
*(imagen de fondo, estilo TV antigua)*

**Texto del título (`.start-center h1`):**  
- Color: `#030303` (casi negro)
- Sombra de texto (`text-shadow`):

0 0 10px #fff,
0 0 20px #fff,
0 0 30px #ffea00,
0 0 40px #ffea00,
0 0 70px #ffea00,
0 0 80px #ffea00,
0 0 100px #ffea00

*(Blanco y amarillo brillante)*

---

## 1.3. Estilos y colores en la pantalla de juego

**Tipografía:**  
`font-family: 'Courier New', monospace;`

**Colores fondo:**  
- Fondo general: `background-color: #111;` (casi negro)
- `.game-window`: `background-color: #222;` (ligeramente más claro)

**Indicadores `.lights span`:**

| Elemento           | Color        | Descripción         |
|--------------------|--------------|---------------------|
| Primer elemento    | #c44         | Rojo oscuro         |
| Segundo elemento   | #ca4         | Amarillo anaranjado |
| Tercer elemento    | #4c4         | Verde               |

---

## 2. Wireframes y Prototipos

### Pantalla de Inicio
**PROTO:**

<img width="383" height="246" alt="image" src="https://github.com/user-attachments/assets/ef025513-9cef-49ee-9ce3-711d62bf30d8" />

---
**MOCKUP:**

<img width="384" height="241" alt="image" src="https://github.com/user-attachments/assets/f8132060-e41a-42f8-8752-76e1adf4206b" />

---
**WIREFRAME:**

<img width="381" height="240" alt="image" src="https://github.com/user-attachments/assets/6cda4892-9165-4547-b1eb-697315d456f7" />

---

### Pantalla de Reglas
**PROTO:**

<img width="379" height="236" alt="image" src="https://github.com/user-attachments/assets/13b178e6-8498-4646-8716-6351b9a74b9d" />

---
**MOCKUP:**

<img width="372" height="237" alt="image" src="https://github.com/user-attachments/assets/1590ddca-3c9c-43d0-9054-4fad9cf936db" />

---
**WIREFRAME:**

<img width="387" height="243" alt="image" src="https://github.com/user-attachments/assets/df32e369-e7cc-4827-ac36-88ac6dd2cf68" />

---

**Reglas del juego:**
Tienes tres oportunidades para completar todos los textos que puedas en un tiempo máximo.
Una vez perdido las tres vidas el revólver girará con una bala en la recámara, si accionas el gatillo y se dispara MUERES; si no sale la bala, se te devuelven las tres vidas y sigues hasta que se acabe el tiempo o vuelvas a equivocarte 3 veces.


---

### Interfaz de Juego
**PROTO:**

<img width="382" height="242" alt="image" src="https://github.com/user-attachments/assets/e91b166a-a292-4f30-8f8c-f51db78ba037" />

---
**MOCKUP:**

<img width="386" height="241" alt="image" src="https://github.com/user-attachments/assets/b5533fb0-9c32-4760-98b2-18d99dd7b49f" />

---
**WIREFRAME:**

<img width="383" height="241" alt="image" src="https://github.com/user-attachments/assets/1dce2caa-eb5c-451f-9527-6ec0de779627" />

---

### Pantalla de Victoria
**PROTO:**

<img width="385" height="242" alt="image" src="https://github.com/user-attachments/assets/e239fe7f-86bf-4877-856c-97cc83d1b6d1" />

---
**MOCKUP:**

<img width="384" height="242" alt="image" src="https://github.com/user-attachments/assets/74fed1d8-6566-40b5-89fc-a4d769b5cc02" />

---
**WIREFRAME:**

<img width="387" height="243" alt="image" src="https://github.com/user-attachments/assets/2f86085e-18aa-4e51-ab29-bafeee26b3d5" />

**Mensaje:**  
**¡GANASTE, HAS SOBREVIVIDO!**

---

### Pantalla de Derrota
**PROTO:**

<img width="379" height="239" alt="image" src="https://github.com/user-attachments/assets/41f1fff2-a264-4ec2-a640-05ac52f14722" />

---
**MOCKUP:**

<img width="384" height="243" alt="image" src="https://github.com/user-attachments/assets/9e108c16-8108-4c5f-ad46-ac37fd8b3c00" />

---
**WIREFRAME:**

<img width="385" height="243" alt="image" src="https://github.com/user-attachments/assets/be26a5f1-f809-40ac-ba5e-26ba1f10efd1" />

---

**Mensaje:**  
**¡PERDISTE, TE HAN DISPARADO EN LA CABEZA!**

---

## 3. Mecánicas y elementos de juego

- **Vidas (corazones)**: Representan las oportunidades del jugador.
- **Revólver visual**: Cuando pierdes las tres vidas, se activa la ruleta rusa para decidir si mueres o recuperas vidas.
- **Cronómetro**: Límite de tiempo para escribir las frases.
- **Frase objetivo y teclado retro**: Interfaz principal del reto.

---

## 4. Flujo del juego

---

<img width="974" height="511" alt="image" src="https://github.com/user-attachments/assets/9340761f-0c8c-479d-95fe-78820e86760c" />

---




