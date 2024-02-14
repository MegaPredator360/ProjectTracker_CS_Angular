using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class TareaService : ITareaService
    {
        private readonly IGenericService<Tarea> tareaService;
        private readonly IGenericService<TareaUsuario> tareaUsuarioService;
        private readonly IMapper mapper;

        public TareaService(IGenericService<Tarea> _tareaService, IGenericService<TareaUsuario> _tareaUsuarioService, IMapper _mapper)
        {
            tareaService = _tareaService;
            tareaUsuarioService = _tareaUsuarioService;
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

        public async Task<List<TareaDTO>> ListaUsuario(int _usuarioId)
        {
            try
            {
                // Obtenermos los Id de las tareas asociadas al usuario
                var queryTareaUsuario = await tareaUsuarioService.Consultar(u => u.UsuaId == _usuarioId);
                var listaTareaUsuario = await queryTareaUsuario.ToListAsync();

                // Obtendremos la lista de tareas
                var queryTarea = await tareaService.Consultar(t => listaTareaUsuario.Select(tu => tu.TareId).Contains(t.TareId));
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

                //Añadir a la tabla relacional
                foreach (var usuarioId in _tareaDTO.TareUsuaId)
                {
                    var tareaUsuario = new TareaUsuario()
                    {
                        TareId = tareaCreada.TareId,
                        UsuaId = usuarioId
                    };
                    await tareaUsuarioService.Crear(tareaUsuario);
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
                var tareaEncontrada = await tareaService.Obtener(t => t.TareId == _tareaDTO.TareId);

                if (tareaEncontrada == null)
                {
                    throw new TaskCanceledException("La tarea no existe");
                }

                // Asignamos los datos de la tarea actualziados
                tareaEncontrada.TareNombre = _tareaDTO.TareNombre;
                tareaEncontrada.TareDescripcion = _tareaDTO.TareDescripcion;
                tareaEncontrada.TareFechaInicio = _tareaDTO.TareFechaInicio;
                tareaEncontrada.TareProyId = _tareaDTO.TareProyId;
                tareaEncontrada.TareEstaId = _tareaDTO.TareEstaId;

                bool respuesta = await tareaService.Editar(tareaEncontrada);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No actualizar datos de tarea");
                }

                // Elimina los usuarios que asignados de la base de datos
                await tareaUsuarioService.EliminarRango(tu => tu.TareId == _tareaDTO.TareId);

                // Agregamos los usuarios actualizados que fueron asociados a la tarea
                foreach (var usuarioId in _tareaDTO.TareUsuaId)
                {
                    var tareaUsuario = new TareaUsuario()
                    {
                        TareId = _tareaDTO.TareId,
                        UsuaId = usuarioId
                    };
                    await tareaUsuarioService.Crear(tareaUsuario);
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
                    throw new TaskCanceledException("La tarea no existe");
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
