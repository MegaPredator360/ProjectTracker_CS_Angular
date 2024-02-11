﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectTracker.DTO
{
    public class TareaDTO
    {
        public int TareId { get; set; }

        public string? TareNombre { get; set; }

        public string? TareDescripcion { get; set; }

        public string? TareFechaInicio { get; set; }

        public int? TareProyId { get; set; }

        public string? TareProyNombre { get; set; }

        public int? TareEstaId { get; set; }

        public string? TareEstaNombre { get; set; }

        public int TareCantidadUsuario { get; set; }

        public virtual ICollection<TareaUsuarioDTO> TareaUsuarios { get; set; } = new List<TareaUsuarioDTO>();
    }
}
