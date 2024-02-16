import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { UtilityService } from '../../utility/utility.service';
import { InicioSesion } from '../../interface/inicio-sesion';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { Sesion } from '../../interface/sesion';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
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
      this.router.navigate(["pages/"])
    }
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

          if (sesion?.unique_name == "True") {
            this.dialog.open(LoginModalComponent, {
              disableClose: true,
              data: sesion
            }).afterClosed().subscribe((resultado: string) => {
              if (resultado == "true") {
                // Se valida si el resultado de cierre es verdadero o no
              }
            });
          }
          else {
            this.utilityService.guardarSesionUsuario(data.value)
            this.router.navigate(["pages/"])
          }
        }
        else {
          this.utilityService.mostrarAlerta("El usuario / contraseña es incorrecta", "error")
          console.log(data.msg)
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
