import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../utility/utility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  userName: string = "";
  permisoNombre: string = "";

  constructor(
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    const usuario = this.utilityService.obtenerSesion();

    if (usuario != null) {
      if (usuario.permisoId == "1")
      {
        this.permisoNombre = "Administrador"
      }
      else if (usuario.permisoId == "2")
      {
        this.permisoNombre = "Gerente"
      }
      else if (usuario.permisoId == "3")
      {
        this.permisoNombre = "Usuario"
      }
      this.userName = usuario.username;
    }
    else {
      this.permisoNombre = '';
      this.userName = '';
    }
  }

  cerrarSesion() {
    this.utilityService.eliminarSesionUsuario();
    this.router.navigate(['./login']);
  }
}
