using ProjectTracker.DAL.Context;
using ProjectTracker.DAL.Interface;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.DAL.Service

{
    public class GenericService<TModel> : IGenericService<TModel> where TModel : class
    {
        private readonly ProjectTrackerContext context;

        public GenericService(ProjectTrackerContext _context)
        {
            context = _context;
        }

        public async Task<TModel> Obtener(Expression<Func<TModel, bool>> _filtro)
        {
            try
            {
                TModel? modelo = await context.Set<TModel>().FirstOrDefaultAsync(_filtro);
                return modelo!;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TModel> Crear(TModel _modelo)
        {
            try
            {
                context.Set<TModel>().Add(_modelo);
                await context.SaveChangesAsync();
                return _modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TModel _modelo)
        {
            try
            {
                context.Set<TModel>().Update(_modelo);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(TModel _modelo)
        {
            try
            {
                context.Set<TModel>().Remove(_modelo);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> EliminarRango(Expression<Func<TModel, bool>> _filtro)
        {
            try
            {
                var elementosEliminar = context.Set<TModel>().Where(_filtro);
                context.Set<TModel>().RemoveRange(elementosEliminar);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public IQueryable<TModel> Consultar(Expression<Func<TModel, bool>>? _filtro = null)
        {
            try
            {
                IQueryable<TModel> queryModelo = _filtro == null
                    ? context.Set<TModel>()
                    : context.Set<TModel>().Where(_filtro);
                return queryModelo;
            }
            catch
            {
                throw;
            }
        }

        public IQueryable<TModel> ConsultaSQL(string consulta)
        {
            try
            {
                IQueryable<TModel> queryModelo = context.Set<TModel>().FromSqlRaw(consulta);
                return queryModelo;
            }
            catch
            {
                throw;
            }
        }
    }
}
