import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermisoService } from '../../../../service/permiso.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { UtilityService } from '../../../../utility/utility.service';
import { Usuario } from '../../../../interface/usuario';
import { Permiso } from '../../../../interface/permiso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrl: './usuario-formulario.component.scss'
})

export class UsuarioFormularioComponent implements OnInit {
  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioUsuario: FormGroup

  // Lista de Permisos
  listaPermisos: Permiso[] = []

  // Datos de usuario
  datosUsuario!: Usuario

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"

  constructor(
    private usuarioService: UsuarioService,
    private permisoService: PermisoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosUsuario = this.usuarioService.getDatosUsuario()

    this.formularioUsuario = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', Validators.required],
      contrasena: [''],
      confirmarContrasena: [''],
      correo: ['', Validators.required],
      permisoId: ['', Validators.required],
      primerInicio: ['1']
    })

    if (this.datosUsuario != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    else {
      // Si el formulario no está vacio, no se solicitará la contraseña ya que solo se actualizarán datos
      this.formularioUsuario.get('contrasena')?.setValidators(Validators.required)
      this.formularioUsuario.get('confirmarContrasena')?.setValidators(Validators.required)
    }

    // Lista de Permisos
    this.permisoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaPermisos = data.value
        }
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    if (this.datosUsuario != null) {
      this.formularioUsuario.patchValue({
        cedula: this.datosUsuario.usuaCedula,
        nombre: this.datosUsuario.usuaPermNombre,
        telefono: this.datosUsuario.usuaTelefono,
        direccion: this.datosUsuario.usuaDireccion,
        username: this.datosUsuario.usuaUsername,
        correo: this.datosUsuario.usuaCorreo
      })

      this.formularioUsuario.get('primerInicio')?.setValue(this.datosUsuario.usuaPrimerInicio)
      this.formularioUsuario.get('permisoId')?.setValue(this.datosUsuario.usuaPermId)
    }
  }

  guardarEditarUsuario() {

    if (this.formularioUsuario.value.contrasena != null)
    {
      
    }

    const usuario: Usuario = {
      usuaId: this.datosUsuario == null ? 0 : this.datosUsuario.usuaId,
      usuaCedula: this.formularioUsuario.value.cedula,
      usuaNombre: this.formularioUsuario.value.nombre,
      usuaUsername: this.formularioUsuario.value.username,
      usuaTelefono: this.formularioUsuario.value.telefono,
      usuaDireccion: this.formularioUsuario.value.direccion,
      usuaCorreo: this.formularioUsuario.value.correo,
      usuaContrasena: this.formularioUsuario.value.contrasena,
      usuaPermId: this.formularioUsuario.value.permisoId,
      usuaPermNombre: "",
      usuaPrimerInicio: parseInt(this.formularioUsuario.value.primerInicio)
    }

    if (this.datosUsuario == null) {
      this.usuarioService.Guardar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            //this.utilityService.mostrarAlerta("El usuario fue registrado", "Exito");
            console.log("Usuario Registrado")
            this.router.navigate(['../']);
          }
          else {
            //this._utilityService.mostrarAlerta("No se pudo registrar el usuario", "Error")
            console.log("Ocurrio un error al registrar")
          }
        },
        error: (e) => { }
      })
    }
    else {
      this.usuarioService.Editar(usuario).subscribe({
        next: (data) => {
          if (data.status) {
            //this.utilityService.mostrarAlerta("El usuario fue actualizado", "Exito");
            console.log("Usuario Registrado")
            this.router.navigate(['../']);
          }
          else {
            console.log("Ocurrio un error al registrar")
          }
        },
        error: (e) => { }
      })
    }
  }
}