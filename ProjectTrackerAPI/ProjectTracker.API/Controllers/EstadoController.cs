using Microsoft.AspNetCore.Mvc;
using ProjectTracker.API.Utility;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DTO;

namespace ProjectTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController: ControllerBase
    {
        private readonly IEstadoService estadoService;

        public EstadoController(IEstadoService _estadoService)
        {
            estadoService = _estadoService;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var response = new Response<List<EstadoDTO>>();

            try
            {
                response.Status = true;
                response.value = await estadoService.Lista();
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