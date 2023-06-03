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
        private readonly IPackageRepository _packageRepository;
        private readonly IPhotoRepository _photoRepository;
        public TipController(
            IMapper mapper,
            ITipRepository tipRepository,
            IPackageRepository packageRepository,
            IPhotoRepository photoRepository
        )
        {
            _mapper = mapper;
            _tipRepository = tipRepository;
            _packageRepository = packageRepository;
            _photoRepository = photoRepository;
        }


        [HttpGet]
        public async Task<ActionResult<ICollection<TipDto>>> GetAllActiveTips()
        {
            var tips = await _tipRepository.GetAllActiveTips();
            if (tips == null) return NotFound();
            return Ok(_mapper.Map<ICollection<TipDto>>(tips));
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ICollection<TipDto>>> GetActiveTipsByPackageId(int id)
        {
            var tips = await _tipRepository.GetActiveTipsByPackageId(id);
            if (tips == null) return NotFound();
            return Ok(_mapper.Map<ICollection<TipDto>>(tips));
        }

        [HttpPost]
        public async Task<ActionResult<TipDto>> CreateTip(TipCreateDto tipCreateDto)
        {
            var tip = _mapper.Map<Tip>(tipCreateDto);
            var packages = await _packageRepository.GetPackagesAsync(tipCreateDto.Packages);
            if (packages == null) return NotFound();
            var photo = await _photoRepository.GetPhotoById(tipCreateDto.Photo.Id);
            if (photo == null) return NotFound();
            tip.Photo = photo;
            tip.Packages = packages;
            _tipRepository.AddTip(tip);
            if (await _tipRepository.SaveAllAsync()) return _mapper.Map<TipDto>(tip);
            return BadRequest("Failed to create tip.");
        }
    }
}