using ProjectTracker.DTO;

namespace ProjectTracker.BLL.Interface
{
    public interface IUsuarioService
    {
        Task<List<UsuarioDTO>> Lista();
        Task<UsuarioDTO> ObtenerUsuario(int _usuarioId);
        Task<string> ValidarCredenciales(string _correo, string _contrasena);
        Task<UsuarioDTO> Crear(UsuarioDTO _usuarioDTO);
        Task<bool> Editar(UsuarioDTO _usuarioDTO);
        Task<bool> CambiarContrasena(UsuarioDTO _usuarioDTO);
        Task<bool> Eliminar(int _usuarioId);
    }
}