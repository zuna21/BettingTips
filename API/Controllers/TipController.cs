using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITipRepository _tipRepository;
        public TipController(
            IMapper mapper,
            ITipRepository tipRepository
        )
        {
            _mapper = mapper;
            _tipRepository = tipRepository;
        }

        [HttpPost]
        public async Task<ActionResult<TipDto>> CreateTip(TipCreateDto tipCreateDto)
        {
            var tip = _mapper.Map<Tip>(tipCreateDto);
            _tipRepository.AddTip(tip);
            if (await _tipRepository.SaveAllAsync()) return _mapper.Map<TipDto>(tip);
            return BadRequest("Failed to create tip");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTip(int id)
        {
            var tip = await _tipRepository.GetTipById(id);
            if (tip == null) return NotFound();
            _tipRepository.DeleteTip(tip);
            if (await _tipRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to delete tip.");
        }
        
        [HttpGet("makeTipsInactive")]
        public async Task<ActionResult> MakeTipsInactive()
        {
            var tips = await _tipRepository.GetAllActiveTips();
            if (tips == null) return NotFound();
            foreach (var tip in tips)
            {
                tip.Status = "inactive";
            }

            if (await _tipRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to make tips inactive.s");
        }

    }
}