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
        private readonly ITokenService _tokenService;
        public UserController(
            IMapper mapper,
            IUserRepository userRepository,
            ITokenService tokenService
        )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpGet("getAllUsers")]
        public async Task<ActionResult<ICollection<UserDto>>> GetAllUsers() 
        {
            var users = await _userRepository.GetAllUsers();
            if (users == null) return NotFound();
            return Ok(_mapper.Map<ICollection<UserDto>>(users));
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
                    if (await _userRepository.SaveAllAsync())
                    {
                        var userToReturn = _mapper.Map<UserDto>(user);
                        userToReturn.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
                        return userToReturn;
                    }
                    return BadRequest("Failed to change user subscription.");
                }
                var userToReturn2 = _mapper.Map<UserDto>(user);
                userToReturn2.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
                return userToReturn2;
            }
            var userToReturn3 = _mapper.Map<UserDto>(user);
            userToReturn3.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);    
            return userToReturn3;
        }

        [HttpPut("approveUser")]
        public async Task<ActionResult<UserDto>> ApproveUser(UserDto userDto)
        {
            var user = await _userRepository.GetUserByUsername(userDto.Username);
            if (user == null) return NotFound();
            user.HasSubscription = true;
            user.StartDate = DateTime.UtcNow;
            user.EndDate = DateTime.UtcNow.AddSeconds(user.Package.ActiveDays);
            if (await _userRepository.SaveAllAsync()) return _mapper.Map<UserDto>(user);
            return BadRequest("Failed to approve user.");
        }

        [HttpDelete("deleteUser/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null) return NotFound();
            _userRepository.DeleteUser(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to delete user.");
        }

    }
}