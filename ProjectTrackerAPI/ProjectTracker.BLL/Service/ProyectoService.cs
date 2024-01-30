using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class ProyectoService: IProyectoService
    {
        private readonly IGenericService<Proyecto> proyectoService;
        private readonly IMapper mapper;

        public ProyectoService(IGenericService<Proyecto> _proyectoService, IMapper _mapper)
        {
            proyectoService = _proyectoService;
            mapper = _mapper;
        }

        public async Task<List<ProyectoDTO>> Lista()
        {
            try
            {
                var queryProyecto = await proyectoService.Consultar();
                var listaProyectos = await queryProyecto.Include(e => e.ProyEsta).ToListAsync();

                return mapper.Map<List<ProyectoDTO>>(listaProyectos.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProyectoDTO> Crear(ProyectoDTO _proyectoDTO)
        {
            try
            {
                var proyectoCreado = await proyectoService.Crear(mapper.Map<Proyecto>(_proyectoDTO));

                if (proyectoCreado == null)
                {
                    throw new TaskCanceledException("No se pudo crear");
                }

                return mapper.Map<ProyectoDTO>(proyectoCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ProyectoDTO _proyectoDTO)
        {
            try
            {
                var proyecto = mapper.Map<Proyecto>(_proyectoDTO);
                var proyectoEncontrado = await proyectoService.Obtener(u => u.ProyId == _proyectoDTO.ProyId);

                if (proyectoEncontrado == null)
                {
                    throw new TaskCanceledException("El producto no existe");
                }

                // Asignamos los productos
                proyectoEncontrado.ProyNombre = proyecto.ProyNombre;
                proyectoEncontrado.ProyDescripcion = proyecto.ProyDescripcion;
                proyectoEncontrado.ProyEstaId = proyecto.ProyEstaId;

                bool respuesta = await proyectoService.Editar(proyectoEncontrado);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No se pudo editar");
                }

                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int _proyectoId)
        {
            try
            {
                var proyectoEncontrado = await proyectoService.Obtener(p => p.ProyId == _proyectoId);

                if (proyectoEncontrado == null)
                {
                    throw new TaskCanceledException("El producto no existe");
                }

                bool respuesta = await proyectoService.Eliminar(proyectoEncontrado);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No se pudo eliminar");
                }

                return respuesta;

            }
            catch
            {
                throw;
            }
        }
    }
}
