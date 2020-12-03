using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserRegisterDto
    {

        [Required]
        public string DisplayName { get; set; }
        [Required]
        [RegularExpression(@"(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$",
             ErrorMessage="Password debe tener 1 mayúscula, 1 minúscula, 1 número, 1 carater no alfanumérico, 1 al menos 6 caracteres")]
        public string Password { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}