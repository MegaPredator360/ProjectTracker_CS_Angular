import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { UtilityService } from '../../utility/utility.service';
import { InicioSesion } from '../../interface/inicio-sesion';

@Component({
  selector: 'app-login',
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
    private utilityService: UtilityService
  ) {
    this.formularioLogin = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
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
        if (data.resultado) {
          this.utilityService.guardarSesionUsuario(data.token)
          this.router.navigate(["pages/"])
        }
        else {
          this.utilityService.mostrarAlerta("El usuario / contraseña es incorrecta", "error")
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
