using System.Linq.Expressions;

namespace ProjectTracker.DAL.Interface
{
    // Acá especificamos que TModel va a ser una clase ya sea de la capa Model o DTO
    public interface IGenericService<TModel> where TModel : class
    {
        // Se utilizará para obtener un usuario, proyecto o tarea mediante su ID
        Task<TModel> Obtener(Expression<Func<TModel, bool>> filtro);

        // Se utiilizará para crear usuarios, proyectos o tareas
        Task<TModel> Crear(TModel modelo);

        // Se utiilizará para editar usuarios, proyectos o tareas
        Task<bool> Editar(TModel modelo);

        // Se utiilizará para eliminar usuarios, proyectos o tareas
        Task<bool> Eliminar(TModel modelo);

        // Obtendrá la lista de usuarios, proyectos o tareas y además contará con una opcion para poder filtrar resultados
        Task<IQueryable<TModel>> Consultar(Expression<Func<TModel, bool>> filtro = null!);
    }
}
