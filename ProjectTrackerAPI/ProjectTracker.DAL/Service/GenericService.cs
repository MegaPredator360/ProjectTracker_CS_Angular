using ProjectTracker.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

using ProjectTracker.DAL.Interface;
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

        public async Task<TModel> Obtener(Expression<Func<TModel, bool>> filtro)
        {
            try
            {
                TModel modelo = await context.Set<TModel>().FirstOrDefaultAsync(filtro);
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TModel> Crear(TModel modelo)
        {
            try
            {
                context.Set<TModel>().Add(modelo);
                await context.SaveChangesAsync();
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TModel modelo)
        {
            try
            {
                context.Set<TModel>().Update(modelo);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(TModel modelo)
        {
            try
            {
                context.Set<TModel>().Remove(modelo);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IQueryable<TModel>> Consultar(Expression<Func<TModel, bool>> filtro = null)
        {
            try
            {
                IQueryable<TModel> queryModelo = filtro == null ? context.Set<TModel>() : context.Set<TModel>().Where(filtro);
                return queryModelo;
            }
            catch
            {
                throw;
            }
        }
    }
}
