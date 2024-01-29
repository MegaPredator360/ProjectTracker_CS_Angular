using System;
using System.Collections.Generic;

namespace ProjectTracker.Model;

public partial class Estado
{
    public int EstaId { get; set; }

    public string? EstaNombre { get; set; }

    public virtual ICollection<Proyecto> Proyectos { get; set; } = new List<Proyecto>();

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();
}
