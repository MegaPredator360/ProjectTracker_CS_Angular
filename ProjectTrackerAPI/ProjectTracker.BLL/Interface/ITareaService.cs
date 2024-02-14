using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface ITareaService
    {
        Task<List<TareaDTO>> Lista();
        Task<List<TareaDTO>> ListaUsuario(int _usuarioId);
        Task<TareaDTO> Crear(TareaDTO _tareaDTO);
        Task<bool> Editar(TareaDTO _tareaDTO);
        Task<bool> Eliminar(int _tareaId);
    }
}
