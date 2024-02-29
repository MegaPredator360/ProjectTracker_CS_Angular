using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class EstadoService: IEstadoService
    {
        private readonly IGenericService<Estado> estadoService;
        private readonly IMapper mapper;

        public EstadoService(IGenericService<Estado> _estadoService, IMapper _mapper)
        {
            estadoService = _estadoService;
            mapper = _mapper;
        }

        public async Task<List<EstadoDTO>> Lista()
        {
            try 
            {
                return mapper.Map<List<EstadoDTO>>(await estadoService.Consultar().ToListAsync());
            }
            catch
            {
                throw;
            }
        }
    }
}