using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjectTracker.BLL.Interface;
using ProjectTracker.BLL.Service;
using ProjectTracker.DAL.Context;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DAL.Service;
using ProjectTracker.Utility;

namespace ProjectTracker.IOC
{
    public static class Dependencia
    {
        // Se encargará de inyectar las dependencias necesarias para la API
        // Agregar el "this" al service collection permitira que este metodo sea detectado como si fuese parte de IServiceColletion
        public static void InjectarDependecias(this IServiceCollection _service, IConfiguration _configuration)
        {
            // Realizará la conexion a la base de datos
            _service.AddDbContext<ProjectTrackerContext>(options =>
            {
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            });

            // Para poder hacer uso de las dependencias generales en cada servicio de los modelos
            _service.AddTransient(typeof(IGenericService<>), typeof(GenericService<>));

            // Se agrego la dependencia del Auto Mapeo de Modelos a los modelos que interactuara con la interface (DTOs)
            _service.AddAutoMapper(typeof(AutoMapperProfile));

            // Agregamos los servicios para ser usados
            _service.AddScoped<IUtilityService, UtilityService>();
            _service.AddScoped<IUsuarioService, UsuarioService>();
            _service.AddScoped<IPermisoService, PermisoService>();
            _service.AddScoped<IEstadoService, EstadoService>();
            _service.AddScoped<ITareaService, TareaService>();
            _service.AddScoped<IProyectoService, ProyectoService>();

        }
    }
}
