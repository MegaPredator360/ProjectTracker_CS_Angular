using System;
using System.Collections.Generic;

namespace ProjectTracker.Model;

public partial class Permiso
{
    public int PermId { get; set; }

    public string? PermNombre { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
