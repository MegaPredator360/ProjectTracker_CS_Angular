import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { UtilityService } from '../../services/utility.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SharedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  userName: string = "";
  permisoNombre: string = "";

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    /*
    const usuario = this.utilityService.obtenerSesion();

    if (usuario != null) {

      switch (usuario.permisoId) {
        case "1":
          this.permisoNombre = "Administrador"
          break

        case "2":
          this.permisoNombre = "Gerente"
          break

        case "3":
          this.permisoNombre = "Usuario"
          break
      }

      this.usuarioService.ObtenerUsuario(parseInt(usuario.usuarioId)).subscribe({
        next: (data) => {
          if (data.status) {
            this.userName = data.value.usuaUsername
          }
        }
      })
    }
    else {
      this.permisoNombre = '';
      this.userName = '';
    }
      */
  }

  cerrarSesion() {
    this.utilityService.eliminarSesionUsuario();
    this.router.navigate(['./login']);
  }
}
