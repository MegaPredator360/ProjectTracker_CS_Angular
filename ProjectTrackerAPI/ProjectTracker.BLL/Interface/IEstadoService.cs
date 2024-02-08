using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface IEstadoService
    {
        Task<List<EstadoDTO>> Lista();
    }
}