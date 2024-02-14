using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProjectTracker.BLL.Interface;
using ProjectTracker.DAL.Interface;
using ProjectTracker.DTO;
using ProjectTracker.Model;

namespace ProjectTracker.BLL.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericService<Usuario> usuarioService;
        private readonly IMapper mapper;
        private readonly IConfiguration config;
        private readonly IUtilityService utilityService;

        public UsuarioService(IGenericService<Usuario> _usuarioService, IMapper _mapper, IConfiguration _config, IUtilityService _utilityService)
        {
            usuarioService = _usuarioService;
            mapper = _mapper;
            config = _config;
            utilityService = _utilityService;
        }

        public async Task<List<UsuarioDTO>> Lista()
        {
            try
            {
                // Obtenemos la lista de usuarios
                var queryUsuario = await usuarioService.Consultar();

                // Incluimos el permiso a la lista de usuarios
                var listaUsuario = await queryUsuario.Include(p => p.UsuaPerm).ToListAsync();

                // Convertimos de Usuario a UsuarioDTO con la ayuda de AutoMapper
                return mapper.Map<List<UsuarioDTO>>(listaUsuario);
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> ValidarCredenciales(string _correo, string _contrasena)
        {
            try
            {
                // Realizamos el proceso de encriptacion de contraseña para verificarla en la base de datos
                string contrasenaHash = utilityService.EncriptarContrasena(_contrasena);

                // Consultamos los datos en la base de datos y buscamos un usuario que coincida con los datos enviados
                var queryUsuario = await usuarioService.Consultar(u => u.UsuaCorreo == _correo && u.UsuaContrasena == contrasenaHash);

                // Si el resultado es nulo enviamos un mensaje diciendo que el usuario no existe
                if (await queryUsuario.FirstOrDefaultAsync() == null)
                {
                    throw new TaskCanceledException("El usuario no existe");
                }
                else
                {                    
                    SesionDTO sesionDTO = new SesionDTO();

                    // Una vez encontrado el usuario, obtenemos el los permisos del usuario
                    Usuario usuarioEncontrado = queryUsuario.Include(p => p.UsuaPerm).FirstOrDefault()!;

                    // Convertimos los datos en un token encriptado para ser enviado a la aplicacion de Angular
                    return utilityService.GenerarToken(usuarioEncontrado.UsuaId, usuarioEncontrado.UsuaUsername!, usuarioEncontrado.UsuaPerm!.PermNombre!, usuarioEncontrado.UsuaPrimerInicio);

                }
            }
            catch
            {
                throw;
            }
        }

        public async Task<UsuarioDTO> Crear(UsuarioDTO _usuarioDTO)
        {
            try
            {
                // Verificaremos si un usuario existe
                if (await usuarioService.Obtener(u => u.UsuaCedula == _usuarioDTO.UsuaCedula) != null)
                {
                    throw new TaskCanceledException("usuaCedulaExiste");
                }
                else if (await usuarioService.Obtener(u => u.UsuaCorreo == _usuarioDTO.UsuaCorreo) != null)
                {
                    throw new TaskCanceledException("usuaCorreoExiste");
                }
                else if (await usuarioService.Obtener(u => u.UsuaUsername == _usuarioDTO.UsuaUsername) != null)
                {
                    throw new TaskCanceledException("usuaUsernameExiste");
                }

                // Encriptamos la contraseña se nos da el usuario
                string contrasenaHash = utilityService.EncriptarContrasena(_usuarioDTO.UsuaContrasena!);

                // Se la damos al modelo de UsuarioDTO
                _usuarioDTO.UsuaContrasena = contrasenaHash;

                // Convertimos de UsuarioDTO a Usuario
                var usuario = mapper.Map<Usuario>(_usuarioDTO);

                // Creamos el usuario con el servicio generico
                var usuarioCreado = await usuarioService.Crear(usuario);

                // Si el usuario no se pudo crear
                if (usuarioCreado == null)
                {
                    throw new TaskCanceledException("No se pudo crear el usuario");
                }

                // Consultamos los datos de el usuario creado
                var query = await usuarioService.Consultar(u => u.UsuaId == usuarioCreado.UsuaId);
                usuarioCreado = query.Include(p => p.UsuaPerm).FirstOrDefault();

                return mapper.Map<UsuarioDTO>(usuarioCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(UsuarioDTO _usuarioDTO)
        {
            try
            {
                // Buscamos el usuario en la base de datos
                var usuarioEncontrado = await usuarioService.Obtener(u => u.UsuaId == _usuarioDTO.UsuaId);

                // Si el usuario no es encontrado
                if (usuarioEncontrado == null)
                {
                    throw new TaskCanceledException("El usuario no existe");
                }

                // Igualamos los nuevos datos
                usuarioEncontrado.UsuaCedula = _usuarioDTO.UsuaCedula;
                usuarioEncontrado.UsuaNombre = _usuarioDTO.UsuaNombre;
                usuarioEncontrado.UsuaUsername = _usuarioDTO.UsuaUsername;
                usuarioEncontrado.UsuaCorreo = _usuarioDTO.UsuaCorreo;
                usuarioEncontrado.UsuaTelefono = _usuarioDTO.UsuaTelefono;
                usuarioEncontrado.UsuaDireccion = _usuarioDTO.UsuaDireccion;
                usuarioEncontrado.UsuaPrimerInicio = Convert.ToBoolean(_usuarioDTO.UsuaPrimerInicio);
                usuarioEncontrado.UsuaPermId = _usuarioDTO.UsuaPermId;

                if (_usuarioDTO.UsuaContrasena != "")
                {
                    usuarioEncontrado.UsuaContrasena = utilityService.EncriptarContrasena(_usuarioDTO.UsuaContrasena!);
                }

                // Se envian los datos a la base de datos
                bool respuesta = await usuarioService.Editar(usuarioEncontrado);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No se pudo editar");
                }

                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int _usuarioId)
        {
            try
            {
                // Obtenemos el usuario por el Id
                var usuarioEncontrado = await usuarioService.Obtener(u => u.UsuaId == _usuarioId);

                if (usuarioEncontrado == null)
                {
                    throw new TaskCanceledException("El usuario no existe");
                }

                // Mandamos a eliminar el usuario
                bool respuesta = await usuarioService.Eliminar(usuarioEncontrado);

                if (!respuesta)
                {
                    throw new TaskCanceledException("No se pudo eliminar");
                }

                return respuesta;
            }
            catch
            {
                throw;
            }
        }
    }
}