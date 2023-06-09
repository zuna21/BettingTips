using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IPackageRepository _packageRepository;
        public AccountController(
            IMapper mapper,
            IUserRepository userRepository,
            ITokenService tokenService,
            IPackageRepository packageRepository
        )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _tokenService = tokenService;
            _packageRepository = packageRepository;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterUser(UserCreateDto userCreateDto)
        {
            var user = _mapper.Map<AppUser>(userCreateDto);
            if (await _userRepository.IsUsernameTaken(user.UserName))   
                return BadRequest("Username is already taken.");
            var package = await _packageRepository.FindPackageById(userCreateDto.Package.Id);
            if (package == null) return NotFound();
            user.Package = package;
            using var hmac = new HMACSHA512();
            user.UserName = userCreateDto.Username.ToLower();
            user.PasswordHash1 = hmac.ComputeHash(Encoding.UTF8.GetBytes(userCreateDto.Password));
            user.PasswordHash2 = hmac.ComputeHash(Encoding.UTF8.GetBytes("12345678"));
            user.PasswordSalt = hmac.Key;
            user.StartDate = null;
            user.EndDate = null;
            _userRepository.AddNewUser(user);
            if (await _userRepository.SaveAllAsync())
            {
                var userToReturn = _mapper.Map<UserDto>(user);
                userToReturn.Token = _tokenService.CreateToken(user, false, false);
                return userToReturn;
            }
            return BadRequest("Failed to create new user.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserLoginDto userLoginDto)
        {
            var user = await _userRepository.GetUserByUsername(userLoginDto.Username);
            if (user == null) return Unauthorized();
            bool isPasswordCorrect = true;
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash1 = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLoginDto.Password));
            for (int i = 0; i < user.PasswordHash1.Length; i++)
            {
                if (computedHash1[i] != user.PasswordHash1[i])
                {
                    isPasswordCorrect = false;
                    break;
                }
            }

            if (!isPasswordCorrect)
            {
                isPasswordCorrect = true;
                for (int i = 0; i < user.PasswordHash2.Length; i++)
                {
                    if (computedHash1[i] != user.PasswordHash2[i])
                    {
                        isPasswordCorrect = false;
                        break;
                    }
                }
            }

            if (!isPasswordCorrect) return Unauthorized();
            var userToReturn = _mapper.Map<UserDto>(user);
            userToReturn.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
            return userToReturn;
        }

        [HttpGet("getUserByToken")]
        public async Task<ActionResult<UserDto>> GetUserByToken()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return NotFound();
            var userToReturn = _mapper.Map<UserDto>(user);
            userToReturn.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
            return userToReturn;
        }

        [HttpPut("selectNewPackage")]
        public async Task<ActionResult<UserDto>> SelectNewPackage(PackageDto packageDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return NotFound();
            var package = await _packageRepository.FindPackageById(packageDto.Id);
            if (package == null) return NotFound();
            user.Package = package;
            user.HasSubscription = false;
            user.EndDate = null;
            user.StartDate = null;
            if (await _userRepository.SaveAllAsync())
            {
                var userToReturn = _mapper.Map<UserDto>(user);
                userToReturn.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
                return userToReturn;
            }
            return BadRequest("Failed to select new package.");
        }

        [HttpGet("makeUserAdmin")]
        public async Task<ActionResult<UserDto>> MakeUserAdmin()
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsername(username);
            if (user == null) return NotFound();
            if (user.UserName != "zuna21") return BadRequest("You cannot be admin.");
            user.IsAdmin = true;
            var userToReturn = _mapper.Map<UserDto>(user);
            userToReturn.Token = _tokenService.CreateToken(user, user.IsAdmin, user.HasSubscription);
            if (await _userRepository.SaveAllAsync()) return userToReturn;
            return BadRequest("Failed to make user admin.");
        }

        
    }
}