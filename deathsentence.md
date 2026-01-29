# Death Sentence – Documentación del videojuego

Juego de supervivencia y escritura rápida, ambientado en una atmósfera de tensión y azar.

---

## 1. Estilos gráficos básicos

---

## 1.1. Pantalla de inicio 

**Tipografía:**  
`font-family: 'Courier New', monospace;`

**Fondo general:**  
`background: url("./assets/inicio.webp") no-repeat center/cover;`  
*(imagen de fondo)*

**Texto del título (`h1`):**  
- Color: `rgb(79, 14, 14)` (rojo oscuro)
- Sombra de texto (`text-shadow`):  
`8px 4px 6px #000;` (negro)

---

## 1.2. Pantalla de reglas 

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
`font-family: 'Josefin Slab', serif;`

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

## 1.4. Pantalla de victoria

**Tipografía:**  
`font-family: 'Josefin Slab', serif;`

---

***Paleta de colores:***

| Elemento           | Color    | Descripción           |
|--------------------|----------|-----------------------|
| Texto principal    | #39D52A  | Verde intenso         |
| Contorno texto     | #111     | Negro casi puro       |
| Fondo imagen       | #3E3E3E–#222 | Gris oscuro degradado |

---

## 1.4. Pantalla de derrota

**Tipografía:**  
`font-family: 'Josefin Slab', serif;`

---

***Paleta de colores:***

| Elemento           | Color    | Descripción           |
|--------------------|----------|-----------------------|
| Texto principal    | #B94A48  | Rojo sangre oscuro    |
| Contorno texto     | #222     | Negro profundo        |
| Fondo imagen       | #000     | Negro absoluto, sangre roja |

---

## 2. Wireframes y Prototipos

### 2.1.Pantalla de Inicio

<div style="display: flex; gap: 16px;">

<img width="381" height="241" alt="WIREFRAME" src="https://github.com/user-attachments/assets/6cda4892-9165-4547-b1eb-697315d456f7" />
<img width="381" height="241" alt="MOCKUP" src="https://github.com/user-attachments/assets/f8132060-e41a-42f8-8752-76e1adf4206b" />
<img width="381" height="241" alt="PROTO" src="https://github.com/user-attachments/assets/ef025513-9cef-49ee-9ce3-711d62bf30d8" />

</div>


---

### 2.2.Pantalla de Reglas

<div style="display: flex; gap: 16px;">

<img width="381" height="241" alt="WIREFRAME" src="https://github.com/user-attachments/assets/df32e369-e7cc-4827-ac36-88ac6dd2cf68" />
<img width="381" height="241" alt="MOCKUP" src="https://github.com/user-attachments/assets/1590ddca-3c9c-43d0-9054-4fad9cf936db" />
<img width="381" height="241" alt="PROTO" src="https://github.com/user-attachments/assets/13b178e6-8498-4646-8716-6351b9a74b9d" />

</div>


---

**Reglas del juego:**
Tienes tres oportunidades para completar todos los textos que puedas en un tiempo máximo.
Una vez perdido las tres vidas el revólver girará con una bala en la recámara, si accionas el gatillo y se dispara MUERES; si no sale la bala, se te devuelven las tres vidas y sigues hasta que se acabe el tiempo o vuelvas a equivocarte 3 veces.


---

### 2.3.Interfaz de Juego

<div style="display: flex; gap: 16px;">

<img width="381" height="241" alt="WIREFRAME" src="https://github.com/user-attachments/assets/1dce2caa-eb5c-451f-9527-6ec0de779627" />
<img width="381" height="241" alt="MOCKUP" src="https://github.com/user-attachments/assets/b5533fb0-9c32-4760-98b2-18d99dd7b49f" />
<img width="381" height="242" alt="PROTO" src="https://github.com/user-attachments/assets/e91b166a-a292-4f30-8f8c-f51db78ba037" />

</div>

---

### 2.4.Pantalla de Victoria

<div style="display: flex; gap: 16px;">

<img width="381" height="241" alt="WIREFRAME" src="https://github.com/user-attachments/assets/2f86085e-18aa-4e51-ab29-bafeee26b3d5" />
<img width="381" height="241" alt="MOCKUP" src="https://github.com/user-attachments/assets/74fed1d8-6566-40b5-89fc-a4d769b5cc02" />
<img width="381" height="241" alt="PROTO" src="https://github.com/user-attachments/assets/e239fe7f-86bf-4877-856c-97cc83d1b6d1" />

</div>

---

**Mensaje:**  
**¡GANASTE, HAS SOBREVIVIDO!**

---

### 2.5.Pantalla de Derrota

<div style="display: flex; gap: 16px;">

<img width="381" height="241" alt="WIREFRAME" src="https://github.com/user-attachments/assets/be26a5f1-f809-40ac-ba5e-26ba1f10efd1" />
<img width="381" height="241" alt="MOCKUP" src="https://github.com/user-attachments/assets/9e108c16-8108-4c5f-ad46-ac37fd8b3c00" />
<img width="381" height="241" alt="PROTO" src="https://github.com/user-attachments/assets/41f1fff2-a264-4ec2-a640-05ac52f14722" />

</div>

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




