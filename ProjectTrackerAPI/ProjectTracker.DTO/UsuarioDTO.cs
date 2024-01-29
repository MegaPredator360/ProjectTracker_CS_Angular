using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectTracker.DTO
{
    public class UsuarioDTO
    {
        public int UsuaId { get; set; }

        public string? UsuaCedula { get; set; }

        public string? UsuaNombre { get; set; }

        public string? UsuaUsername { get; set; }

        public string? UsuaCorreo { get; set; }

        public string? UsuaContrasena { get; set; }

        public string? UsuaTelefono { get; set; }

        public string? UsuaDireccion { get; set; }

        public int? UsuaPrimerInicio { get; set; }

        public int? UsuaPermId { get; set; }
        public string? UsuaPermNombre { get; set; }
    }
}
