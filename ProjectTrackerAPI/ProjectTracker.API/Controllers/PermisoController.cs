using Microsoft.AspNetCore.Mvc;
using ProjectTracker.API.Utility;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DTO;

namespace ProjectTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermisoController: ControllerBase
    {
        private readonly IPermisoService permisoService;

        public PermisoController(IPermisoService _permisoService)
        {
            permisoService = _permisoService;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var response = new Response<List<PermisoDTO>>();

            try
            {
                response.Status = true;
                response.value = await permisoService.Lista();
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