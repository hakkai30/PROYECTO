using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarutoApi.Data;
using NarutoApi.Models;

namespace NarutoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EpisodiosAlternativosController : ControllerBase
    {
        private readonly NarutoDbContext _context;

        public EpisodiosAlternativosController(NarutoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var episodios = await _context.EpisodiosAlternativos.Include(e => e.Saga).ToListAsync();
            return Ok(episodios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var episodio = await _context.EpisodiosAlternativos.Include(e => e.Saga).FirstOrDefaultAsync(e => e.Alt_id == id);
            if (episodio == null) return NotFound();
            return Ok(episodio);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EpisodioAlternativo episodio)
        {
            _context.EpisodiosAlternativos.Add(episodio);
            await _context.SaveChangesAsync();
            return Ok(episodio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EpisodioAlternativo episodio)
        {
            var existing = await _context.EpisodiosAlternativos.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Num_episode = episodio.Num_episode;
            existing.Title = episodio.Title;
            existing.Type = episodio.Type;
            existing.Year_launch = episodio.Year_launch;
            existing.Rate = episodio.Rate;
            existing.Votes = episodio.Votes;
            existing.SagaName = episodio.SagaName;
            existing.Airdate = episodio.Airdate;
            existing.Description = episodio.Description;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var episodio = await _context.EpisodiosAlternativos.FindAsync(id);
            if (episodio == null) return NotFound();
            _context.EpisodiosAlternativos.Remove(episodio);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
