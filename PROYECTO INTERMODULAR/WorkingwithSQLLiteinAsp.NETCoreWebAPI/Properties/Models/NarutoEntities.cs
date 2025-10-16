using System.Text.Json.Serialization;
namespace NarutoApi.Models
{
    public class Saga
    {
        public string SagaName { get; set; } = null!;
        public string? Description { get; set; }

        [JsonIgnore]
        public ICollection<Episodio> Episodios { get; set; } = new List<Episodio>();
        [JsonIgnore]
        public ICollection<EpisodioAlternativo> EpisodiosAlternativos { get; set; } = new List<EpisodioAlternativo>();
    }

    public class Episodio
    {
        public int Num_episode { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public int? Year_launch { get; set; }
        public int? Rate { get; set; }
        public int? Votes { get; set; }
        public string? SagaName { get; set; }
        public string? Airdate { get; set; }

        public Saga? Saga { get; set; }
    }

    public class EpisodioAlternativo
    {
        public int Alt_id { get; set; }
        public int? Num_episode { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public int? Year_launch { get; set; }
        public int? Rate { get; set; }
        public int? Votes { get; set; }
        public string? SagaName { get; set; }
        public string? Airdate { get; set; }
        public string? Description { get; set; }

        public Saga? Saga { get; set; }
    }
}