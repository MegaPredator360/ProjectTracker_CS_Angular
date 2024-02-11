namespace ProjectTracker.Model
{
    public class TareaUsuario
    {
        public int UsuaId { get; set; }
        public virtual Usuario? Usuarios { get; set; }

        public int TareId { get; set; }
        public virtual Tarea? Tareas { get; set; }
    }
}