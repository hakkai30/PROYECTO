using Microsoft.EntityFrameworkCore;
using NarutoApi.Models;

namespace NarutoApi.Data
{
    public class NarutoDbContext : DbContext
    {
        public NarutoDbContext(DbContextOptions<NarutoDbContext> options) : base(options) { }

        public DbSet<Saga> Sagas { get; set; }
        public DbSet<Episodio> Episodios { get; set; }
        public DbSet<EpisodioAlternativo> EpisodiosAlternativos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Sagas
            modelBuilder.Entity<Saga>()
                .HasKey(s => s.SagaName);
            modelBuilder.Entity<Saga>()
                .Property(s => s.SagaName)
                .IsRequired();

            // Episodios
            modelBuilder.Entity<Episodio>()
                .HasKey(e => e.Num_episode);
            modelBuilder.Entity<Episodio>()
                .HasOne(e => e.Saga)
                .WithMany(s => s.Episodios)
                .HasForeignKey(e => e.SagaName)
                .HasPrincipalKey(s => s.SagaName);

            // EpisodiosAlternativos
            modelBuilder.Entity<EpisodioAlternativo>()
                .HasKey(ea => ea.Alt_id);
            modelBuilder.Entity<EpisodioAlternativo>()
                .HasOne(ea => ea.Saga)
                .WithMany(s => s.EpisodiosAlternativos)
                .HasForeignKey(ea => ea.SagaName)
                .HasPrincipalKey(s => s.SagaName);
        }
    }
}