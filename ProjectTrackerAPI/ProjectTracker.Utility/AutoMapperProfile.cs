using System.Runtime.InteropServices;
using AutoMapper;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.Utility
{
    public class AutoMapperProfile: Profile
    {
        // Constructor
        // Agregaremos los mapeos dentro del constructor
        public AutoMapperProfile() 
        {
            CreateMap<Permiso, PermisoDTO>().ReverseMap();

            CreateMap<Estado, EstadoDTO>().ReverseMap();

            // Conversion de Usuarios
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(destino => destino.UsuaPermNombre, opt => opt.MapFrom(origen => origen.UsuaPerm!.PermNombre))
                .ForMember(destino => destino.UsuaContrasena, opt => opt.Ignore())
                .ForMember(destino => destino.UsuaPrimerInicio, opt => opt.MapFrom(origen => origen.UsuaPrimerInicio == true ? 1 : 0));

            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino => destino.UsuaPerm, opt => opt.Ignore())
                .ForMember(destino => destino.UsuaPrimerInicio, opt => opt.MapFrom(origen => origen.UsuaPrimerInicio == 1 ? true : false));

            // Conversion para Proyectos
            CreateMap<Proyecto, ProyectoDTO>()
                .ForMember(destino => destino.ProyEstaNombre, opt => opt.MapFrom(origen => origen.ProyEsta!.EstaNombre))
                .ForMember(destino => destino.ProyCantidadTarea, opt => opt.MapFrom(origen => origen.Tareas.Count()));

            CreateMap<ProyectoDTO, Proyecto>()
                .ForMember(destino => destino.ProyEsta, opt => opt.Ignore());

            // Conversion para Tareas
            CreateMap<Tarea, TareaDTO>()
                .ForMember(destino => destino.TareProyNombre, opt => opt.MapFrom(origen => origen.TareProy!.ProyNombre))
                .ForMember(destino => destino.TareEstaNombre, opt => opt.MapFrom(origen => origen.TareEsta!.EstaNombre))
                .ForMember(destino => destino.TareCantidadUsuario, opt => opt.MapFrom(origen => origen.TareaUsuarios.Count()))
                .ForMember(destino => destino.TareUsuaId, opt => opt.MapFrom(origen => origen.TareaUsuarios.Select(tu => tu.UsuaId).ToList()));

            CreateMap<TareaDTO, Tarea>()
                .ForMember(destino => destino.TareProy, opt => opt.Ignore())
                .ForMember(destino => destino.TareEsta, opt => opt.Ignore())
                .ForMember(destino => destino.TareaUsuarios, opt => opt.Ignore());
        }
    }
}
