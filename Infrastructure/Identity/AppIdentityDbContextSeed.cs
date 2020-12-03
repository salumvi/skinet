using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {

            if(! userManager.Users.Any()){
            
                var user = new AppUser
                {
                    DisplayName = "Juan",
                    Email = "juan@email.com",
                    UserName = "juan@email.com",
                    Address = new Address
                    {
                        FirstName = "Juan",
                        LastName = "Juanito",
                        Street = "101 Cipreses",
                        City = "Salamanca",
                        State = "ES",
                        Zipcode = "37180"

                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            };

        }
    }
}