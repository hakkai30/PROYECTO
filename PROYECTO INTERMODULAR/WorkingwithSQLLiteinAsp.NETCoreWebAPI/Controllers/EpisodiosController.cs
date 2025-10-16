using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarutoApi.Data;
using NarutoApi.Models;

namespace NarutoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EpisodiosController : ControllerBase
    {
        private readonly NarutoDbContext _context;

        public EpisodiosController(NarutoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var episodios = await _context.Episodios.Include(e => e.Saga).ToListAsync();
            return Ok(episodios);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var episodio = await _context.Episodios.Include(e => e.Saga).FirstOrDefaultAsync(e => e.Num_episode == id);
            if (episodio == null) return NotFound();
            return Ok(episodio);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Episodio episodio)
        {
            _context.Episodios.Add(episodio);
            await _context.SaveChangesAsync();
            return Ok(episodio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Episodio episodio)
        {
            var existing = await _context.Episodios.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Title = episodio.Title;
            existing.Type = episodio.Type;
            existing.Year_launch = episodio.Year_launch;
            existing.Rate = episodio.Rate;
            existing.Votes = episodio.Votes;
            existing.SagaName = episodio.SagaName;
            existing.Airdate = episodio.Airdate;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var episodio = await _context.Episodios.FindAsync(id);
            if (episodio == null) return NotFound();
            _context.Episodios.Remove(episodio);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
