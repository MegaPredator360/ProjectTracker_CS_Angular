using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class TareaService: ITareaService
    {
        private readonly IGenericService<Tarea> tareaService;
        private readonly IMapper mapper;

        public TareaService(IGenericService<Tarea> _tareaService, IMapper _mapper)
        {
            tareaService = _tareaService;
            mapper = _mapper;
        }

        public async Task<List<TareaDTO>> Lista()
        {
            try
            {
                var queryTarea = await tareaService.Consultar();
                var listaTarea = await queryTarea
                    .Include(e => e.TareEsta)
                    .Include(p => p.TareProy)
                    .Include(tu => tu.TareaUsuarios)
                    .ToListAsync();

                return mapper.Map<List<TareaDTO>>(listaTarea.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<TareaDTO> Crear(TareaDTO _tareaDTO)
        {
            try
            {
                var tareaCreada = await tareaService.Crear(mapper.Map<Tarea>(_tareaDTO));

                if (tareaCreada == null)
                {
                    throw new TaskCanceledException("No se pudo crear");
                }

                return mapper.Map<TareaDTO>(tareaCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TareaDTO _tareaDTO)
        {
            try
            {
                var tarea = mapper.Map<Tarea>(_tareaDTO);
                var tareaEncontrada = await tareaService.Obtener(t => t.TareId == _tareaDTO.TareId);

                if (tareaEncontrada == null)
                {
                    throw new TaskCanceledException("El producto no existe");
                }

                // Asignamos los productos
                tareaEncontrada.TareNombre = tarea.TareNombre;
                tareaEncontrada.TareDescripcion = tarea.TareDescripcion;
                tareaEncontrada.TareProyId = tarea.TareProyId;
                tareaEncontrada.TareEstaId = tarea.TareEstaId;

                bool respuesta = await tareaService.Editar(tareaEncontrada);

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

        public async Task<bool> Eliminar(int _tareaId)
        {
            try
            {
                var tareaEncontrada = await tareaService.Obtener(t => t.TareId == _tareaId);

                if (tareaEncontrada == null)
                {
                    throw new TaskCanceledException("El producto no existe");
                }

                bool respuesta = await tareaService.Eliminar(tareaEncontrada);

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
