﻿using System;
using System.Collections.Generic;

namespace ProjectTracker.Model;

public partial class Tarea
{
    public int TareId { get; set; }

    public string? TareNombre { get; set; }

    public string? TareDescripcion { get; set; }

    public string? TareFechaInicio { get; set; }

    public int? TareProyId { get; set; }

    public int? TareEstaId { get; set; }

    public virtual Estado? TareEsta { get; set; }

    public virtual Proyecto? TareProy { get; set; }

    public virtual ICollection<TareaUsuario> TareaUsuarios { get; set; } = new List<TareaUsuario>();
}
