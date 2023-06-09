using System.Security.Claims;
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
            user.EndDate = DateTime.UtcNow.AddDays(user.Package.ActiveDays);
            if (await _userRepository.SaveAllAsync()) return _mapper.Map<UserDto>(user);
            return BadRequest("Failed to approve user.");
        }

        [HttpGet("checkUserSubscription")]
        public async Task<ActionResult<UserDto>> CheckUserSubscription() 
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return NotFound();
            if (user.HasSubscription)
            {
                var currentDate = DateTime.UtcNow;
                if (user.EndDate <= currentDate)
                {
                    user.HasSubscription = false;
                    user.StartDate = null;
                    user.EndDate = null;
                    if (await _userRepository.SaveAllAsync()) return _mapper.Map<UserDto>(user);
                    return BadRequest("Failed to change user subscription.");
                }

                return _mapper.Map<UserDto>(user);
            }

            return _mapper.Map<UserDto>(user);
        }
    }
}