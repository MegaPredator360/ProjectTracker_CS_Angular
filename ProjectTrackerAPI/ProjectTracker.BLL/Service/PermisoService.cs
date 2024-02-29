using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
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
                return mapper.Map<List<PermisoDTO>>(await permisoService.Consultar().ToListAsync());
            }
            catch
            {
                throw;
            }
        }
    }
}