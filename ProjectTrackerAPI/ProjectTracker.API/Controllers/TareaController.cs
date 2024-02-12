using Microsoft.AspNetCore.Mvc;
using ProjectTracker.API.Utility;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DTO;

namespace ProjectTracker.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ITareaService tareaService;

        public TareaController(ITareaService _tareaService)
        {
            tareaService = _tareaService;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var response = new Response<List<TareaDTO>>();

            try
            {
                response.Status = true;
                response.value = await tareaService.Lista();
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
        public async Task<IActionResult> Guardar([FromBody] TareaDTO _tareaDTO)
        {
            var response = new Response<TareaDTO>();

            try
            {
                response.Status = true;
                response.value = await tareaService.Crear(_tareaDTO);
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
        public async Task<IActionResult> Editar([FromBody] TareaDTO _tareaDTO)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await tareaService.Editar(_tareaDTO);
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
        public async Task<IActionResult> Eliminar(int Id)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await tareaService.Eliminar(Id);
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
