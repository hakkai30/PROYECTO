-- Tabla para almacenar las sagas
CREATE TABLE Sagas (
    SagaName VARCHAR(255) PRIMARY KEY,
    Description TEXT
);

-- Tabla para almacenar los episodios
CREATE TABLE Episodios (
    NumEpisode INT PRIMARY KEY,//
    Title VARCHAR(255),//
    Type VARCHAR(50),//
    YearLaunch INT,//
    Rate DECIMAL(3,1),//
    Votes INT,//
    SagaName VARCHAR(255),//
    Airdate DATE,//
    FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName)
);

-- Tabla para relacionar episodios y sagas (opcional si se quiere una relación explícita)
-- En este caso es redundante porque EpisodioNs ya tiene SagaName, pero puede servir para consultas específicas
CREATE TABLE EpisodiosPorSaga (
    SagaName VARCHAR(255),
    NumEpisode INT,
    PRIMARY KEY (SagaName, NumEpisode),
    FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName),
    FOREIGN KEY (NumEpisode) REFERENCES Episodios(NumEpisode)
);
