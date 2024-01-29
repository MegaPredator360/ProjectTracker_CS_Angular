using System;
using System.Collections.Generic;

namespace ProjectTracker.Model;

public partial class Proyecto
{
    public int ProyId { get; set; }

    public string? ProyNombre { get; set; }

    public string? ProyDescripcion { get; set; }

    public int? ProyEstaId { get; set; }

    public virtual Estado? ProyEsta { get; set; }

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();
}
