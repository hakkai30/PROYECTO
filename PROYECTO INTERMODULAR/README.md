# API Gestión de Episodios, Alternativos y Sagas

API REST para la gestión de episodios, episodios alternativos y sagas, desarrollada como parte de la actividad evaluable AC3. Incluye operaciones CRUD y referencias de base de datos SQLite.

---

## Tabla de Contenidos

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Modelos de Datos](#modelos-de-datos)
- [Gestión de Errores](#gestión-de-errores)
- [Ejemplos de Peticiones](#ejemplos-de-peticiones)
- [Autores](#autores)

---

## Introducción

Esta API permite gestionar series y anime incluyendo episodios, sagas y episodios alternativos.  
Proyecto desarrollado por Fabio y Robin para la práctica AC3.

---

## Instalación

1. Clona este repositorio:
   
    git clone https://github.com/hakkai30/PROYECTO/edit/main/PROYECTO%20INTERMODULAR/README.md
   
    `cd WorkingwithSQLLiteinAsp.NETCoreWebAPI`
    
3. Restaura las dependencias:
    
    `dotnet restore`
    
4. Ejecuta la API:
    
    `dotnet run`

---

## Estructura de la Base de Datos

Los modelos y sus relaciones principales son:


`CREATE TABLE Sagas (
  SagaName TEXT PRIMARY KEY,
  Description TEXT
);`

`CREATE TABLE Episodios (
  Numepisode INTEGER PRIMARY KEY,
  Title TEXT,
  Type TEXT,
  Yearlaunch INTEGER,
  Rate INTEGER,
  Votes INTEGER,
  SagaName TEXT,
  Airdate TEXT,
  FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName)
);`

`CREATE TABLE EpisodiosAlternativos (
  Altid INTEGER PRIMARY KEY AUTOINCREMENT,
  Numepisode INTEGER,
  Title TEXT,
  Type TEXT,
  Yearlaunch INTEGER,
  Rate INTEGER,
  Votes INTEGER,
  SagaName TEXT,
  Airdate TEXT,
  Description TEXT,
  FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName)
);`

---

## Uso

Accede a la documentación y pruebas interactivas en Swagger:  
http://localhost:5280/swagger/index.html
(Ajusta el puerto según tu entorno.)

---

## Endpoints

### Episodios

- **GET** `/api/Episodios`  
  Obtiene todos los episodios.

- **POST** `/api/Episodios`  
  Crea un nuevo episodio.

- **GET** `/api/Episodios/{id}`  
  Consulta un episodio por su número.

- **PUT** `/api/Episodios/{id}`  
  Modifica un episodio existente.

- **DELETE** `/api/Episodios/{id}`  
  Borra el episodio por número.

### Episodios Alternativos

- **GET** `/api/EpisodiosAlternativos`  
  Lista todos los episodios alternativos.

- **POST** `/api/EpisodiosAlternativos`  
  Crea un episodio alternativo.

- **GET** `/api/EpisodiosAlternativos/{id}`  
  Consulta un episodio alternativo por ID.

- **PUT** `/api/EpisodiosAlternativos/{id}`  
  Modifica un episodio alternativo.

- **DELETE** `/api/EpisodiosAlternativos/{id}`  
  Borra un episodio alternativo por ID.

### Sagas

- **GET** `/api/Sagas`  
  Lista todas las sagas.

- **POST** `/api/Sagas`  
  Crea una saga nueva.

- **GET** `/api/Sagas/{id}`  
  Consulta una saga por nombre.

- **PUT** `/api/Sagas/{id}`  
  Modifica una saga.

- **DELETE** `/api/Sagas/{id}`  
  Borra una saga por nombre.

---

## Modelos de Datos

### Episodio

`{
  "num_episode": 1,
  "title": "Piloto",
  "type": "canon",
  "year_launch": 2023,
  "rate": 9,
  "votes": 100,
  "sagaName": "Saga Inicial",
  "airdate": "2023-01-01",
  "saga": {
    "sagaName": "Saga Inicial",
    "description": "Descripción de la saga"
  }
}`

### Episodio Alternativo

`{
  "alt_id": 1,
  "num_episode": 1,
  "title": "Piloto alternativo",
  "type": "especial",
  "year_launch": 2023,
  "rate": 7,
  "votes": 50,
  "sagaName": "Saga Especial",
  "airdate": "2023-02-01",
  "description": "Un episodio extra",
  "saga": {
    "sagaName": "Saga Especial",
    "description": "Saga paralela"
  }
}`

### Saga

`{
  "sagaName": "Saga Inicial",
  "description": "Descripción de la saga"
}`

---

## Gestión de Errores

| Código | Significado             |
|--------|------------------------|
| 400    | Petición inválida      |
| 401    | No autorizado          |
| 404    | No encontrado          |
| 500    | Error interno servidor |

**Nota:** Se corrigió un bug eliminando el id=1 de EpisodiosAlternativos; muchos errores (500) eran por ese motivo.

---

## Ejemplos de Peticiones

### Obtener todos los episodios

curl -X GET http://localhost:5000/api/Episodios

### Crear un episodio

`curl -X POST http://localhost:5000/api/Episodios -H "Content-Type: application/json" -d '{
  "num_episode": 5,
  "title": "Nombre episodio",
  "type": "canon",
  "year_launch": 2024,
  "rate": 9,
  "votes": 89,
  "sagaName": "Saga principal",
  "airdate": "2024-05-01"
}'`


### Crear saga

`curl -X POST http://localhost:5000/api/Sagas -H "Content-Type: application/json" -d '{
  "sagaName": "Saga principal",
  "description": "Saga principal de la serie"
}'`

### Crear episodio alternativo

`curl -X POST http://localhost:5000/api/EpisodiosAlternativos -H "Content-Type: application/json" -d '{
  "num_episode": 5,
  "title": "Versión extendida",
  "type": "especial",
  "year_launch": 2024,
  "rate": 8,
  "votes": 30,
  "sagaName": "Saga principal",
  "airdate": "2024-05-10",
  "description": "Versión extendida del episodio 5"
}'`

---

## Autores

Fabio y Robin  
Curso DAW - Proyecto AC3  

