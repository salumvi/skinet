using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extension
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByUserByClaimsPrimcipalWithAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user){

            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await input.Users.Include(u => u.Address).SingleOrDefaultAsync(e => e.Email == email);
        }

            public static async Task<AppUser> FindByEmailAsync(this UserManager<AppUser> input, ClaimsPrincipal user){

            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await input.Users.SingleOrDefaultAsync(e => e.Email == email);
        }
    }
}