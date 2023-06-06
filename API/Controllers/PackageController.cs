using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPackageRepository _packageRepository;
        private readonly IUserRepository _userRepository;
        public PackageController(
            IMapper mapper,
            IPackageRepository packageRepository,
            IUserRepository userRepository
        )
        {
            _mapper = mapper;
            _packageRepository = packageRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<ActionResult<PackageDto>> CreatePackage(PackageCreateDto packageCreateDto)
        {
            var package = _mapper.Map<Package>(packageCreateDto);
            _packageRepository.AddPackage(package);
            if (await _packageRepository.SaveAllAsync()) return _mapper.Map<PackageDto>(package);
            return BadRequest("Failed to create package");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePackage(int id)
        {
            var package = await _packageRepository.FindPackageById(id);
            if (package == null) return NotFound();
            _packageRepository.DeletePackage(package);
            if (await _packageRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to delete package.");
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<PackageDto>>> GetAllPackages()
        {
            var packages = await _packageRepository.GetAllPackages();
            if (packages == null) return NotFound();
            return Ok(_mapper.Map<ICollection<PackageDto>>(packages));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PackageDto>> GetPackage(int id)
        {
            var package = await _packageRepository.FindPackageById(id);
            if (package == null) return NotFound();
            return _mapper.Map<PackageDto>(package);
        }


        [HttpGet("getUserPackages")]
        public async Task<ActionResult<ICollection<PackageDto>>> GetUserPackages()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (username == null) return Unauthorized();
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return NotFound();
            if (user.IsAdmin) 
            {
                var adminPackages = await _packageRepository.GetAllPackages();
                if (adminPackages == null) return NotFound();
                return Ok(_mapper.Map<ICollection<PackageDto>>(adminPackages));
            }
            var packages = new List<Package>{};
            packages.Add(user.Package);
            return Ok(_mapper.Map<ICollection<PackageDto>>(packages));

        }
    }
}