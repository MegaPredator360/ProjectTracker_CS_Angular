using System;
using System.Collections.Generic;

namespace ProjectTracker.Model;

public partial class Usuario
{
    public int UsuaId { get; set; }

    public string? UsuaCedula { get; set; }

    public string? UsuaNombre { get; set; }

    public string? UsuaUsername { get; set; }

    public string? UsuaCorreo { get; set; }

    public string? UsuaContrasena { get; set; }

    public string? UsuaTelefono { get; set; }

    public string? UsuaDireccion { get; set; }

    public bool? UsuaPrimerInicio { get; set; }

    public int? UsuaPermId { get; set; }

    public virtual Permiso? UsuaPerm { get; set; }

    public virtual ICollection<TareaUsuario> TareaUsuarios { get; set; } = new List<TareaUsuario>();
}
