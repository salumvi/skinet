using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extension;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(
            UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper)
        {
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            
            var user = await _userManager.FindByEmailAsync(HttpContext.User);

            return new UserDto{
                DisplayName = user.DisplayName,
                Email=user.Email,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExixtAsync([FromQuery] string email){
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress(){
            //var email = HttpContext.User?.Claims?.FirstOrDefault( c => c.Type == ClaimTypes.Email)?.Value;

            // var user = await _userManager.Users.Include(a => a.Address).SingleOrDefaultAsync(e=> e.Email== email);
            var user = await _userManager.FindByUserByClaimsPrimcipalWithAddressAsync(HttpContext.User);

            return _mapper.Map<Address,AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address){
            var user = await _userManager.FindByUserByClaimsPrimcipalWithAddressAsync(HttpContext.User);
            user.Address = _mapper.Map<Address>(address);

            var result = await _userManager.UpdateAsync(user);
            if(result.Succeeded){
                return Ok(_mapper.Map<AddressDto>(user.Address));
            }
            return BadRequest( "problem pudating the user");
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){
            
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if(user == null) return Unauthorized(new ApiResponse(401));
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            
            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto{
                DisplayName = user.DisplayName,
                Email=user.Email,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(UserRegisterDto userRegisterDto){

               if (CheckEmailExixtAsync(userRegisterDto.Email).Result.Value) {
                   return BadRequest(new ApiValidationErrorResponse{
                       Errors = new []{"Email está en uso"}
                   });

               }

            var user = new AppUser{
                DisplayName = userRegisterDto.DisplayName,
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.Email
    
            };    
            
            var resut = await _userManager.CreateAsync( user, userRegisterDto.Password);

            if(!resut.Succeeded) return Unauthorized(new ApiResponse(400));

            return new UserDto{
                DisplayName=user.DisplayName,
                Email = user.Email,
                Token =  _tokenService.CreateToken(user)
            };
        }
    }
}