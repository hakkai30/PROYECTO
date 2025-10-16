using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NarutoApi.Data;
using NarutoApi.Models;

namespace NarutoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SagasController : ControllerBase
    {
        private readonly NarutoDbContext _context;

        public SagasController(NarutoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sagas = await _context.Sagas.Include(s => s.Episodios).Include(s => s.EpisodiosAlternativos).ToListAsync();
            return Ok(sagas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var saga = await _context.Sagas.Include(s => s.Episodios).Include(s => s.EpisodiosAlternativos).FirstOrDefaultAsync(s => s.SagaName == id);
            if (saga == null) return NotFound();
            return Ok(saga);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Saga saga)
        {
            _context.Sagas.Add(saga);
            await _context.SaveChangesAsync();
            return Ok(saga);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Saga saga)
        {
            var existing = await _context.Sagas.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Description = saga.Description;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var saga = await _context.Sagas.FindAsync(id);
            if (saga == null) return NotFound();
            _context.Sagas.Remove(saga);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
