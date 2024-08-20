import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { UtilityService } from '../../../services/utility.service';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-modal-borrar-usuario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-borrar-usuario.component.html',
  styleUrl: './modal-borrar-usuario.component.scss'
})
export class ModalBorrarUsuarioComponent {
  nombreUsuario: string = ""

  constructor(
    private modalActual: MatDialogRef<ModalBorrarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = this.datosUsuario.usuaNombre
  }

  usuarioEliminar() {
    this.usuarioService.Eliminar(this.datosUsuario.usuaId).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("El usuario fue eliminado", "exito");
          this.modalActual.close();
        }
        else {
          this.utilityService.mostrarAlerta("No se pudo eliminar el usuario", "error")
          console.error(data.msg)
        }
      },
      error: (e) => { 
        this.utilityService.mostrarAlerta("Ocurrio un error al eliminar el usuario", "error")
        console.error(e)
      }
    })
  }
}
