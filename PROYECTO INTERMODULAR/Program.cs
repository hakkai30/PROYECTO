using System;
using Microsoft.Data.Sqlite;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=naruto.db";
        string csvFilePath = "naruto.csv";

        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string createTablesQuery = @"
                CREATE TABLE IF NOT EXISTS Sagas (
                    SagaName VARCHAR(255) PRIMARY KEY,
                    Description TEXT
                );
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
                CREATE TABLE IF NOT EXISTS EpisodiosPorSaga (
                    SagaName VARCHAR(255),
                    NumEpisode INT,
                    PRIMARY KEY (SagaName, NumEpisode),
                    FOREIGN KEY (SagaName) REFERENCES Sagas(SagaName),
                    FOREIGN KEY (NumEpisode) REFERENCES Episodios(NumEpisode)
                );";

            using (var cmd = new SqliteCommand(createTablesQuery, connection))
                cmd.ExecuteNonQuery();

            if (File.Exists(csvFilePath))
            {
                var lines = File.ReadAllLines(csvFilePath);

                for (int i = 1; i < lines.Length; i++) // saltar encabezado
                {
                    var campos = lines[i].Split(',');

                    // Asignación correcta de campos
                    int numEpisode = int.Parse(campos[1].Replace("\"", ""));
                    string title = campos[2];
                    string type = campos[3]; // texto, no convertir
                    int yearLaunch = int.Parse(campos[4].Replace("\"", ""));
                    decimal rate = decimal.Parse(campos[5].Replace("\"", ""));
                    int votes = int.Parse(campos[6].Replace("\"", ""));
                    string sagaName = campos[7];

                    Console.WriteLine($"Campos: {numEpisode}, {title}, {type}, {yearLaunch}, {rate}, {votes}, {sagaName}");

                    string insertSaga = "INSERT OR IGNORE INTO Sagas (SagaName) VALUES (@SagaName);";
                    using (var sagaCmd = new SqliteCommand(insertSaga, connection))
                    {
                        sagaCmd.Parameters.AddWithValue("@SagaName", sagaName);
                        sagaCmd.ExecuteNonQuery();
                    }

                    string insertEpisode = @"
                        INSERT OR REPLACE INTO Episodios 
                        (NumEpisode, Title, Type, YearLaunch, Rate, Votes, SagaName)
                        VALUES (@NumEpisode, @Title, @Type, @YearLaunch, @Rate, @Votes, @SagaName);";
                    using (var episodeCmd = new SqliteCommand(insertEpisode, connection))
                    {
                        episodeCmd.Parameters.AddWithValue("@NumEpisode", numEpisode);
                        episodeCmd.Parameters.AddWithValue("@Title", title);
                        episodeCmd.Parameters.AddWithValue("@Type", type);
                        episodeCmd.Parameters.AddWithValue("@YearLaunch", yearLaunch);
                        episodeCmd.Parameters.AddWithValue("@Rate", rate);
                        episodeCmd.Parameters.AddWithValue("@Votes", votes);
                        episodeCmd.Parameters.AddWithValue("@SagaName", sagaName);
                        episodeCmd.ExecuteNonQuery();
                    }

                    string insertEpisodiosPorSaga = @"
                        INSERT OR IGNORE INTO EpisodiosPorSaga (SagaName, NumEpisode) 
                        VALUES (@SagaName, @NumEpisode);";
                    using (var epsCmd = new SqliteCommand(insertEpisodiosPorSaga, connection))
                    {
                        epsCmd.Parameters.AddWithValue("@SagaName", sagaName);
                        epsCmd.Parameters.AddWithValue("@NumEpisode", numEpisode);
                        epsCmd.ExecuteNonQuery();
                    }
                }

                Console.WriteLine("Datos importados correctamente.\n");

                Console.WriteLine("Sagas:");
                using (var cmd = new SqliteCommand("SELECT * FROM Sagas;", connection))
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        Console.WriteLine($"SagaName: {reader["SagaName"]}, Description: {reader["Description"]}");

                Console.WriteLine("\nEpisodios:");
                using (var cmd = new SqliteCommand("SELECT * FROM Episodios;", connection))
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        Console.WriteLine($"NumEpisode: {reader["NumEpisode"]}, Title: {reader["Title"]}, SagaName: {reader["SagaName"]}");

                Console.WriteLine("\nEpisodiosPorSaga:");
                using (var cmd = new SqliteCommand("SELECT * FROM EpisodiosPorSaga;", connection))
                using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                        Console.WriteLine($"SagaName: {reader["SagaName"]}, NumEpisode: {reader["NumEpisode"]}");
            }
            else
            {
                Console.WriteLine("No se encontró el archivo CSV.");
            }
        }
    }
}
