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
                var tareaActualizada = mapper.Map<Tarea>(_tareaDTO);
                var tareaEncontrada = await tareaService.Obtener(t => t.TareId == _tareaDTO.TareId);

                if (tareaEncontrada == null)
                {
                    throw new TaskCanceledException("La tarea no existe");
                }

                // Asignamos los datos de la tarea actualziados
                tareaEncontrada.TareNombre = tareaActualizada.TareNombre;
                tareaEncontrada.TareDescripcion = tareaActualizada.TareDescripcion;
                tareaEncontrada.TareFechaInicio = tareaActualizada.TareFechaInicio;
                tareaEncontrada.TareProyId = tareaActualizada.TareProyId;
                tareaEncontrada.TareEstaId = tareaActualizada.TareEstaId;

                bool respuesta = await tareaService.Editar(tareaEncontrada);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No actualizar datos de tarea");
                }
                
                // Elimina los usuarios que fueron desmarcados de la base de datos
                var tareaUsuarioBD = await tareaUsuarioService.Consultar(tu => tu.TareId == tareaActualizada.TareId);
                var usuariosDesmarcados = await tareaUsuarioBD.ToListAsync();

                foreach (var usuario in usuariosDesmarcados)
                {
                    bool respuestaDesmarcados = await tareaUsuarioService.Eliminar(usuario);

                    if (!respuestaDesmarcados)
                    {
                        throw new TaskCanceledException("No se pudo eliminar los usuarios desmarcados");
                    }
                }

                // Obtenemos los IDs de usuarios que ya están asociados a la tarea
                tareaUsuarioBD = await tareaUsuarioService.Consultar(tu => tu.TareId == tareaActualizada.TareId);
                var usuariosAsociados = await tareaUsuarioBD.ToListAsync();

                // Filtramos los usuarios actualizados que aún no están asociados a la tarea
                var usuariosNuevos = tareaActualizada.TareaUsuarios.Where(u => !usuariosAsociados.Contains(u));
                
                foreach (var usuario in usuariosNuevos)
                {
                    await tareaUsuarioService.Crear(usuario);
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
