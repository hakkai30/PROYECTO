using System;
using System.Data.SQLite;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=naruto.db;Version=3;";
        string csvFilePath = "naruto.csv";

        // Conexión SQLite
        using (var connection = new SQLiteConnection(connectionString))
        {
            connection.Open();

            // Crear las tablas directamente en el código
            string createTablesQuery = @"
                -- Tabla para almacenar las sagas
                CREATE TABLE IF NOT EXISTS Sagas (
                    SagaName VARCHAR(255) PRIMARY KEY,
                    Description TEXT
                );

                -- Tabla para almacenar los episodios
                CREATE TABLE IF NOT EXISTS Episodios (
                    NumEpisode INT PRIMARY KEY,
                    Title VARCHAR(255),
                    Type VARCHAR(50),
                    YearLaunch INT,
                    Rate DECIMAL(3,1),
                    Votes INT,
                    SagaName VARCHAR(255),
                    FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName)
                );

                -- Tabla para relacionar episodios y sagas (opcional)
                CREATE TABLE IF NOT EXISTS EpisodiosPorSaga (
                    SagaName VARCHAR(255),
                    NumEpisode INT,
                    PRIMARY KEY (SagaName, NumEpisode),
                    FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName),
                    FOREIGN KEY (NumEpisode) REFERENCES Episodios(NumEpisode)
                );
            ";

            using (var command = new SQLiteCommand(createTablesQuery, connection))
            {
                command.ExecuteNonQuery();
            }

            Console.WriteLine("Las tablas se han creado correctamente.");

            // Leer el archivo CSV e insertar datos
            if (File.Exists(csvFilePath))
            {
                Console.WriteLine("Archivo CSV encontrado. Procesando...");
            }
            else
            {
                Console.WriteLine($"El archivo {csvFilePath} no existe.");
            }
        }
    }
}