namespace ProjectTracker.DAL.Interface
{
    public interface IOtrosService
    {
        string EncriptarContrasena(string _contrasena);
        string GenerarToken(int _usuarioId, string _userName, string _permisoNombre, bool? _primerInicio);
    }
}
