using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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

        [HttpPut("editUser/{id}")]
        public async Task<ActionResult<UserDto>> EditUser(int id, UserEditDto userEditDto)
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userThatEdit = await _userRepository.GetUserByUsername(username);
            if (userThatEdit == null) return NotFound();
            if (!userThatEdit.IsAdmin)
            {
                if (userThatEdit.Id != id) return Unauthorized();
            } 
            var editableUser = await _userRepository.GetUserById(id); // ovdje ne dobijes package jer koristis FindAsync umjesto FirstOrDefaultAsync
            if (editableUser == null) return NotFound();
            
            using var hmac = new HMACSHA512(editableUser.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userEditDto.Password));
            editableUser.PasswordHash1 = computedHash;
            var userToReturn = _mapper.Map<UserDto>(editableUser);
            userToReturn.Token = _tokenService.CreateToken(editableUser, editableUser.IsAdmin, editableUser.HasSubscription);
            if (await _userRepository.SaveAllAsync()) return userToReturn;
            return BadRequest("Failed to edit profile.");
        }

        [HttpDelete("deleteUser/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            string username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userAdmin = await _userRepository.GetUserByUsername(username);
            if (userAdmin == null) return NotFound();
            if (!userAdmin.IsAdmin) return Unauthorized();
            var user = await _userRepository.GetUserById(id);
            if (user == null) return NotFound();
            _userRepository.DeleteUser(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to delete user.");
        }

    }
}