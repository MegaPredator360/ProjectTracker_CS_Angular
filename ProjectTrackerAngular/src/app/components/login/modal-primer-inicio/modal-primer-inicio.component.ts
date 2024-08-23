import { Component, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sesion } from '../../../interfaces/sesion';
import { UsuarioService } from '../../../services/usuario.service';
import { UtilityService } from '../../../services/utility.service';
import { Usuario } from '../../../interfaces/usuario';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-modal-primer-inicio',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-primer-inicio.component.html',
  styleUrl: './modal-primer-inicio.component.scss'
})
export class ModalPrimerInicioComponent {
  ocultarContrasena: boolean = true
  formularioUsuario: FormGroup

  constructor(
    private modalActual: MatDialogRef<ModalPrimerInicioComponent>,
    @Inject(MAT_DIALOG_DATA) public datoSesion: Sesion,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private elementRef: ElementRef,
    private fb: FormBuilder
  ) {
    this.formularioUsuario = this.fb.group({
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
    })
  }

  cambiarContrasena() {

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

    const usuario: Usuario = {
      usuaId: parseInt(this.datoSesion.usuarioId),
      usuaCedula: "",
      usuaNombre: "",
      usuaUsername: "",
      usuaTelefono: "",
      usuaDireccion: "",
      usuaCorreo: "",
      usuaContrasena: this.formularioUsuario.value.contrasena,
      usuaPermId: 0,
      usuaPermNombre: "",
      usuaPrimerInicio: 0
    }

    this.usuarioService.CambiarContraseña(usuario).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("La contraseña fue actualizada. Inicia sesion nuevamente", "exito")
          this.modalActual.close("true")
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al cambiar la contraseña", "error")
          console.error(data.msg)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al cambiar la contraseña", "error")
        console.error(e)
      }
    })
  }

  closeModal() {
    this.modalActual.close()
  }
}
