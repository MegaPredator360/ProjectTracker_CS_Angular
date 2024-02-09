using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectTracker.DTO
{
    public class ProyectoDTO
    {
        public int ProyId { get; set; }

        public string? ProyNombre { get; set; }

        public string? ProyDescripcion { get; set; }

        public string? ProyFechaInicio { get; set; }

        public int? ProyEstaId { get; set; }

        public string? ProyEstaNombre { get; set; }

        public int ProyCantidadTarea { get; set; }
    }
}
