import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UtilityService } from '../../services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { InicioSesion } from '../../interfaces/inicio-sesion';
import { ModalPrimerInicioComponent } from './modal-primer-inicio/modal-primer-inicio.component';
import { Sesion } from '../../interfaces/sesion';
import { NgIf } from '@angular/common';
import { ModalAyudaInicioComponent } from './modal-ayuda-inicio/modal-ayuda-inicio.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  formularioLogin: FormGroup
  ocultarContrasena: boolean = true
  mostrarProgressBar: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private dialog: MatDialog
  ) {
    this.formularioLogin = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }

  ngOnInit() {
    const usuario = this.utilityService.obtenerSesion()

    if (usuario != null) {
      this.utilityService.mostrarAlerta("Debes de cerrar sesion para acceder a esta pagina", "error")
      this.router.navigate(["/"])
    }
  }

  ayudaInicioSesion() {
    this.dialog.open(ModalAyudaInicioComponent, {
      disableClose: true
    })
  }

  iniciarSesion() {
    this.mostrarProgressBar = true
    const request: InicioSesion = {
      correo: this.formularioLogin.value.correo,
      contrasena: this.formularioLogin.value.contrasena
    }

    this.usuarioService.iniciarSesion(request).subscribe({
      next: (data) => {
        if (data.status) {
          const sesion = JSON.parse(atob(data.value!.split('.')[1])) as Sesion

          if (sesion?.primerInicio == "1") {
            this.dialog.open(ModalPrimerInicioComponent, {
              disableClose: true,
              data: sesion
            });
          }
          else {
            this.utilityService.guardarSesionUsuario(data.value)
            this.router.navigate(["/"])
          }
        }
        else {
          this.utilityService.mostrarAlerta(data.msg, "error")
        }
      },
      complete: () => {
        this.mostrarProgressBar = false
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al Iniciar Sesion", "error")
        console.log(e)
        this.mostrarProgressBar = false
      }
    })
  }
}
