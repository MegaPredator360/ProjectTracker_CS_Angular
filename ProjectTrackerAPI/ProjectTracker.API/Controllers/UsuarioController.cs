using Microsoft.AspNetCore.Mvc;
using ProjectTracker.API.Utility;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DTO;

namespace ProjectTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService usuarioService;

        public UsuarioController(IUsuarioService _usuarioService)
        {
            usuarioService = _usuarioService;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var response = new Response<List<UsuarioDTO>>();

            try
            {
                response.Status = true;
                response.value = await usuarioService.Lista();
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion([FromBody] IniciarSesionDTO _iniciarSesionDTO)
        {
            var response = new Response<string>();

            try
            {
                response.Status = true;
                response.value = await usuarioService.ValidarCredenciales(_iniciarSesionDTO.Correo!, _iniciarSesionDTO.Contrasena!);
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
        public async Task<IActionResult> Guardar([FromBody] UsuarioDTO usuario)
        {
            var response = new Response<UsuarioDTO>();

            try
            {
                response.Status = true;
                response.value = await usuarioService.Crear(usuario);
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
        public async Task<IActionResult> Editar([FromBody] UsuarioDTO usuario)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await usuarioService.Editar(usuario);
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.msg = ex.Message;
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("CambiarContrasena")]
        public async Task<IActionResult> CambiarContrasena([FromBody] UsuarioDTO usuario)
        {
            var response = new Response<bool>();

            try
            {
                response.Status = true;
                response.value = await usuarioService.CambiarContrasena(usuario);
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
                response.value = await usuarioService.Eliminar(Id);
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
