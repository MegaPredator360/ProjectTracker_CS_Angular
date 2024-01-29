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
                .ForMember(destino => destino.UsuaPrimerInicio, opt => opt.MapFrom(origen => origen.UsuaPrimerInicio == true ? 1 : 0));

            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino => destino.UsuaPerm, opt => opt.Ignore())
                .ForMember(destino => destino.UsuaPrimerInicio, opt => opt.MapFrom(origen => origen.UsuaPrimerInicio == 1 ? true : false));

            CreateMap<Proyecto, ProyectoDTO>().ReverseMap();

            CreateMap<Tarea, TareaDTO>().ReverseMap();
        }
    }
}
