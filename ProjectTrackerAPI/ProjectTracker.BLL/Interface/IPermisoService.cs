using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface IPermisoService
    {
        Task<List<PermisoDTO>> Lista();
    }
}