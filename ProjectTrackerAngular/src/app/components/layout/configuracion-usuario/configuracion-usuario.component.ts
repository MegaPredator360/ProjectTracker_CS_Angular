import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../interface/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { UtilityService } from '../../../utility/utility.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.component.html',
  styleUrl: './configuracion-usuario.component.scss'
})
export class ConfiguracionUsuarioComponent {
  formularioUsuario: FormGroup
  datosUsuario: Usuario
  ocultarContrasena: boolean = true

  constructor(
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private elementRef: ElementRef
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
      correo: ['', Validators.required]
    })

    // Obtener Usuario
    this.usuarioService.ObtenerUsuario(parseInt(this.utilityService.obtenerSesion().usuarioId)).subscribe({
      next: (data) => {
        if (data.status) {
          this.formularioUsuario.patchValue({
            cedula: data.value.usuaCedula,
            nombre: data.value.usuaNombre,
            telefono: data.value.usuaTelefono,
            direccion: data.value.usuaDireccion,
            username: data.value.usuaUsername,
            correo: data.value.usuaCorreo
          })
        }
      },
      error: (e) => { 
        this.utilityService.mostrarAlerta("Ocurrio un error al cargar los datos del usuario", "error")
        console.log(e)
      }
    })
  }

  submitUsuario() {
    // Se verificará que el correo ingresado sea un correo valido
    if (!this.utilityService.verificarCorreo(this.formularioUsuario.value.correo)) {
      // Se le realizará un focus al input
      this.elementRef.nativeElement.querySelector('[formcontrolname="correo"]').focus()
      this.utilityService.mostrarAlerta("El correo ingresado no es valido", "error")
      return
    }

    if (this.formularioUsuario.value.contrasena != "") {

      // Se verifica que la contraseña cumpla con los requisitos: 1 Mayuscula, 1 minuscula, 1 simbolo, 1 numero y 8 caracteres
      if (!this.utilityService.verificarContrasena(this.formularioUsuario.value.contrasena)) {

        this.elementRef.nativeElement.querySelector('[formcontrolname="contrasena"]').focus()
        this.utilityService.mostrarAlerta("La contraseña no cumple con los requisitos minimos", "error")
        return
      }

      if (this.formularioUsuario.value.contrasena != this.formularioUsuario.value.confirmarContrasena) {
        // Se le realizará un focus al input
        this.elementRef.nativeElement.querySelector('[formcontrolname="confirmarContrasena"]').focus()
        this.utilityService.mostrarAlerta("Las contraseñas no son iguales", "error")
        return
      }
    }

    const usuario: Usuario = {
      usuaId: parseInt(this.utilityService.obtenerSesion().usuarioId),
      usuaCedula: this.formularioUsuario.value.cedula,
      usuaNombre: this.formularioUsuario.value.nombre,
      usuaUsername: this.formularioUsuario.value.username,
      usuaTelefono: this.formularioUsuario.value.telefono,
      usuaDireccion: this.formularioUsuario.value.direccion,
      usuaCorreo: this.formularioUsuario.value.correo,
      usuaContrasena: this.formularioUsuario.value.contrasena,
      usuaPermId: parseInt(this.utilityService.obtenerSesion().permisoId),
      usuaPermNombre: "",
      usuaPrimerInicio: parseInt(this.utilityService.obtenerSesion().primerInicio)
    }

    this.usuarioService.Editar(usuario).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("El usuario fue actualizado", "exito")
          window.location.reload()
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el usuario", "error")
          console.log(data.msg)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el usuario", "error")
        console.log(e)
      }
    })
  }

}
