namespace ProjectTracker.DAL.Interface
{
    public interface IUtilityService
    {
        string EncriptarContrasena(string _contrasena);
        string GenerarToken(int _usuarioId, int? _permisoId, bool? _primerInicio);
    }
}
