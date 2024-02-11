namespace ProjectTracker.Model
{
    public class TareaUsuario
    {
        public string? UsuaId { get; set; }
        public virtual Usuario? Usuarios { get; set; }

        public int TareId { get; set; }
        public virtual Tarea? Tareas { get; set; }
    }
}