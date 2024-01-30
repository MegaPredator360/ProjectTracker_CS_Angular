using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface IProyectoService
    {
        Task<List<ProyectoDTO>> Lista();
        Task<ProyectoDTO> Crear(ProyectoDTO _proyectoDTO);
        Task<bool> Editar(ProyectoDTO _proyectoDTO);
        Task<bool> Eliminar(int _proyectoId);
    }
}
