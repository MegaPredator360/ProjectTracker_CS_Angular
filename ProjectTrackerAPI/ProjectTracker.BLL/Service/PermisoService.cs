using AutoMapper;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class PermisoService: IPermisoService
    {
        private readonly IGenericService<Permiso> permisoService;
        private readonly IMapper mapper;

        public PermisoService(IGenericService<Permiso> _permisoService, IMapper _mapper)
        {
            permisoService = _permisoService;
            mapper = _mapper;
        }

        public async Task<List<PermisoDTO>> Lista()
        {
            try 
            {
                var listaPermiso = await permisoService.Consultar();
                return mapper.Map<List<PermisoDTO>>(listaPermiso.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}