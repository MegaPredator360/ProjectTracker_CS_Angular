using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProjectTracker.DAL.Interface;
using ProjectTracker.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ProjectTracker.DAL.Service
{
    public class UtilityService : IUtilityService
    {
        private readonly IConfiguration config;

        public UtilityService(IConfiguration _config)
        {
            config = _config;
        }

        public string EncriptarContrasena(string _contrasena)
        {
            SHA256 hash = SHA256.Create();

            // Convertira la contraseña en un array de bytes
            var contrasenaBytes = Encoding.Default.GetBytes(_contrasena); 

            // La contraseña se se convierte en un codigo Hash
            var contrasenaHash = hash.ComputeHash(contrasenaBytes);

            // Se devuelve la contraseña convertida en un string
            return Convert.ToHexString(contrasenaHash); 
        }

        public string GenerarToken(int _usuarioId, string _userName, int _permisoId, bool? _primerInicio)
        {
            // Se obtiene una llave de carateres que usará para generar nuestro token, esta llave estará ubicada en el appSettings.json
            var llave = config.GetValue<string>("JwtSettings:key");

            // La llave se convierte a un array de bits
            var llaveBytes = Encoding.ASCII.GetBytes(llave!);

            // Apartir de la informacion del usuario se creará el token
            var claims = new List<Claim>
            {
                new Claim("usuarioId",_usuarioId.ToString()),
                new Claim("username", _userName),
                new Claim("permisoId", _permisoId.ToString()),
                new Claim("primerInicio", Convert.ToInt32(_primerInicio).ToString())
            };

            var claimIdentity = new ClaimsIdentity(claims);

            // Se crea una credencial para el token
            var credencialesToken = new SigningCredentials(
                new SymmetricSecurityKey(llaveBytes),
                SecurityAlgorithms.HmacSha256Signature
            );

            // Se crea el detalle del Token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimIdentity,
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = credencialesToken
            };

            // Se crearan los controladores del JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string tokenCreado = tokenHandler.WriteToken(tokenConfig);

            return tokenCreado;
        }

        
    }
}
