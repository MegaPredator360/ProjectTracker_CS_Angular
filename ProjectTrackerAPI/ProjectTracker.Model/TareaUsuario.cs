namespace ProjectTracker.Model
{
    public class TareaUsuario
    {
        public string? UsuaId { get; set; }
        public Usuario? Usuarios { get; set; }

        public int TareId { get; set; }
        public Tarea? Tareas { get; set; }
    }
}