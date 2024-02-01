import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from '../../../../service/permiso.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { UtilityService } from '../../../../utility/utility.service';
import { Usuario } from '../../../../interface/usuario';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrl: './usuario-formulario.component.scss'
})

export class UsuarioFormularioComponent implements OnInit {
  formularioUsuario: FormGroup;
  datosUsuario!: Usuario

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"
  
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
    ) {
    // Obtener los datos almacenados en el servicio
    this.datosUsuario = this.usuarioService.getDatosUsuario()

    this.formularioUsuario = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      permisoId: ['', Validators.required],
      primerInicio: ['1', Validators.required]
    });

    if (this.datosUsuario != null)
    {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

  ngOnInit(): void {
    if (this.datosUsuario != null)
    {
      this.formularioUsuario.patchValue({
        cedula: this.datosUsuario.usuaCedula,
        nombre: this.datosUsuario.usuaPermNombre,
        telefono: this.datosUsuario.usuaTelefono,
        direccion: this.datosUsuario.usuaDireccion,
        username: this.datosUsuario.usuaUsername,
        correo: this.datosUsuario.usuaCorreo,
        contrasena: "",
        permisoId: this.datosUsuario.usuaPermId,
        primerInicio: this.datosUsuario.usuaPrimerInicio.toString()
      })
    }
  }
}