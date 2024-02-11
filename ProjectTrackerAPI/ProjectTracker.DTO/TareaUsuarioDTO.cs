namespace ProjectTracker.DTO
{
    public class TareaUsuarioDTO
    {
        public string? UsuaId { get; set; }
        public virtual UsuarioDTO? Usuario { get; set; }

        public int TareId { get; set; }
        public virtual TareaDTO? Tarea { get; set; }
    }
}