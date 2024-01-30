using Microsoft.AspNetCore.Mvc;
using ProjectTracker.API.Utility;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DTO;

namespace ProjectTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectoController : ControllerBase
    {
        private readonly IProyectoService proyectoService;

        public ProyectoController(IProyectoService _proyectoService)
        {
            proyectoService = _proyectoService;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var response = new Response<List<ProyectoDTO>>();

            try
            {
                response.Status = true;
                response.value = await proyectoService.Lista();
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }
            return Ok(response);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] ProyectoDTO _proyectoDTO)
        {
            var response = new Response<ProyectoDTO>();

            try
            {
                response.Status = true;
                response.value = await proyectoService.Crear(_proyectoDTO);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }
            return Ok(response);
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] ProyectoDTO _proyectoDTO)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await proyectoService.Editar(_proyectoDTO);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }

            return Ok(response);
        }

        [HttpDelete]
        [Route("Eliminar/{Id:int}")]
        public async Task<IActionResult> Eliminar(int _proyectoId)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await proyectoService.Eliminar(_proyectoId);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }

            return Ok(response);
        }
    }
}
