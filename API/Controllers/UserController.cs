using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public UserController(
            IMapper mapper,
            IUserRepository userRepository
        )
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet("GetAllUnsubscriptionUsers")]
        public async Task<ActionResult<ICollection<UserDto>>> GetAllUnsubscriptionUsers()
        {
            var users = await _userRepository.GetAllUnsubscriptionUsers();
            if (users == null) return NotFound();
            return Ok(_mapper.Map<ICollection<UserDto>>(users));   
        }

        [HttpPut("approveUser")]
        public async Task<ActionResult<UserDto>> ApproveUser(UserDto userDto)
        {
            var user = await _userRepository.GetUserByUsername(userDto.Username);
            if (user == null) return NotFound();
            user.HasSubscription = true;
            user.StartDate = DateTime.UtcNow;
            user.EndDate = DateTime.UtcNow.AddDays(30);
            if (await _userRepository.SaveAllAsync()) return _mapper.Map<UserDto>(user);
            return BadRequest("Failed to approve user.");
        }
    }
}