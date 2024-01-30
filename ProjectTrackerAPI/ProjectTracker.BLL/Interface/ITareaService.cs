using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface ITareaService
    {
        Task<List<TareaDTO>> Lista();
        Task<TareaDTO> Crear(TareaDTO _tareaDTO);
        Task<bool> Editar(TareaDTO _tareaDTO);
        Task<bool> Eliminar(int _tareaId);
    }
}
