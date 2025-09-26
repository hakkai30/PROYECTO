using System;
using System.Data.SQLite;
using System.IO;
using System.Globalization;

class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=naruto.db;Version=3;";
        string sqlFilePath = "naruto.sql";
        string csvFilePath = "naruto.csv";

        // Crear la conexión SQLite
        using (var connection = new SQLiteConnection(connectionString))
        {
            connection.Open();

            // Leer y ejecutar el archivo SQL
            if (File.Exists(sqlFilePath))
            {
                string sqlCommands = File.ReadAllText(sqlFilePath);
                using (var command = new SQLiteCommand(sqlCommands, connection))
                {
                    command.ExecuteNonQuery();
                }
            }
            else
            {
                Console.WriteLine($"El archivo {sqlFilePath} no existe.");
                return;
            }

            // Leer el archivo CSV e insertar datos
            if (File.Exists(csvFilePath))
            {
                using (var reader = new StreamReader(csvFilePath))
                {
                    string headerLine = reader.ReadLine(); // Leer la cabecera del CSV
                    if (headerLine == null)
                    {
                        Console.WriteLine("El archivo CSV está vacío.");
                        return;
                    }

                    string[] headers = headerLine.Split(',');

                    while (!reader.EndOfStream)
                    {
                        string line = reader.ReadLine();
                        string[] values = line.Split(',');

                        // Crear una consulta de inserción dinámica basada en las columnas del CSV
                        string insertQuery = $"INSERT INTO Users ({string.Join(", ", headers)}) VALUES ({string.Join(", ", headers.Select(h => "@" + h))});";

                        using (var command = new SQLiteCommand(insertQuery, connection))
                        {
                            for (int i = 0; i < headers.Length; i++)
                            {
                                command.Parameters.AddWithValue("@" + headers[i], values[i]);
                            }
                            command.ExecuteNonQuery();
                        }
                    }
                }
            }
            else
            {
                Console.WriteLine($"El archivo {csvFilePath} no existe.");
            }
        }
    }
}