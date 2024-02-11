namespace ProjectTracker.DTO
{
    public class TareaUsuarioDTO
    {
        public string? UsuaId { get; set; }
        public UsuarioDTO? Usuario { get; set; }

        public int TareId { get; set; }
        public TareaDTO? Tarea { get; set; }
    }
}