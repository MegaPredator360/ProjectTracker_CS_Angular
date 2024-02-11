using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.Model;

namespace ProjectTracker.DAL.Context;

public partial class ProjectTrackerContext : DbContext
{
    public ProjectTrackerContext() { }

    public ProjectTrackerContext(DbContextOptions<ProjectTrackerContext> options) : base(options) { }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Permiso> Permisos { get; set; }

    public virtual DbSet<Proyecto> Proyectos { get; set; }

    public virtual DbSet<Tarea> Tareas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<TareaUsuario> TareaUsuarios { get; set; }

    // Se encargará de realizar la conexion a la base de datos
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Indicará datos de Primary Keys y Foreign Keys dentro de la base de datos
        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.EstaId);

            entity.ToTable("ESTADO");

            entity.Property(e => e.EstaId).HasColumnName("ESTA_ID");
            entity.Property(e => e.EstaNombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ESTA_NOMBRE");
        });

        modelBuilder.Entity<Permiso>(entity =>
        {
            entity.HasKey(e => e.PermId);

            entity.ToTable("PERMISO");

            entity.Property(e => e.PermId).HasColumnName("PERM_ID");
            entity.Property(e => e.PermNombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PERM_NOMBRE");
        });

        modelBuilder.Entity<Proyecto>(entity =>
        {
            entity.HasKey(e => e.ProyId);

            entity.ToTable("PROYECTO");

            entity.Property(e => e.ProyId).HasColumnName("PROY_ID");
            entity.Property(e => e.ProyDescripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("PROY_DESCRIPCION");
            entity.Property(e => e.ProyEstaId).HasColumnName("PROY_ESTA_ID");
            entity.Property(e => e.ProyNombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("PROY_NOMBRE");
            entity.Property(e => e.ProyFechaInicio)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("PROY_FECHA_INICIO");

            entity.HasOne(d => d.ProyEsta).WithMany(p => p.Proyectos)
                .HasForeignKey(d => d.ProyEstaId)
                .HasConstraintName("FK_PROY_ESTA");
        });

        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.TareId);

            entity.ToTable("TAREA");

            entity.Property(e => e.TareId).HasColumnName("TARE_ID");
            entity.Property(e => e.TareDescripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("TARE_DESCRIPCION");
            entity.Property(e => e.TareEstaId).HasColumnName("TARE_ESTA_ID");
            entity.Property(e => e.TareNombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("TARE_NOMBRE");
            entity.Property(e => e.TareFechaInicio)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("TARE_FECHA_INICIO");
                
            entity.Property(e => e.TareProyId).HasColumnName("TARE_PROY_ID");

            entity.HasOne(d => d.TareEsta).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.TareEstaId)
                .HasConstraintName("FK_TARE_ESTA");

            entity.HasOne(d => d.TareProy).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.TareProyId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_TARE_PROY");

            /*
            entity.HasMany(d => d.Usuarios).WithMany(p => p.Tares)
                .UsingEntity<Dictionary<string, object>>(
                    "TareaUsuario",
                    r => r.HasOne<Usuario>().WithMany()
                        .HasForeignKey("UsuaId")
                        .HasConstraintName("FK_TAUS_USUA"),
                    l => l.HasOne<Tarea>().WithMany()
                        .HasForeignKey("TareId")
                        .HasConstraintName("FK_TAUS_TARE"),
                    j =>
                    {
                        j.HasKey("TareId", "UsuaId").HasName("PK_TARE_USUA");
                        j.ToTable("TAREA_USUARIO");
                        j.IndexerProperty<int>("TareId").HasColumnName("TARE_ID");
                        j.IndexerProperty<int>("UsuaId").HasColumnName("USUA_ID");
                    });
            */
        });

        modelBuilder.Entity<TareaUsuario>(entity => {

            entity.HasOne(u => u.Usuarios)
                .WithMany(tu => tu.TareaUsuarios)
                .HasForeignKey("UsuaId")
                .HasConstraintName("FK_TAUS_USUA");

            entity.HasOne(u => u.Tareas)
                .WithMany(tu => tu.TareaUsuarios)
                .HasForeignKey("TareId")
                .HasConstraintName("FK_TAUS_TARE");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuaId);

            entity.ToTable("USUARIO");

            entity.Property(e => e.UsuaId).HasColumnName("USUA_ID");
            entity.Property(e => e.UsuaCedula)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("USUA_CEDULA");
            entity.Property(e => e.UsuaContrasena)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("USUA_CONTRASENA");
            entity.Property(e => e.UsuaCorreo)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("USUA_CORREO");
            entity.Property(e => e.UsuaDireccion)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("USUA_DIRECCION");
            entity.Property(e => e.UsuaNombre)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("USUA_NOMBRE");
            entity.Property(e => e.UsuaPermId).HasColumnName("USUA_PERM_ID");
            entity.Property(e => e.UsuaPrimerInicio).HasColumnName("USUA_PRIMER_INICIO");
            entity.Property(e => e.UsuaTelefono)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("USUA_TELEFONO");
            entity.Property(e => e.UsuaUsername)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("USUA_USERNAME");

            entity.HasOne(d => d.UsuaPerm).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.UsuaPermId)
                .HasConstraintName("FK_USUA_PERM");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
