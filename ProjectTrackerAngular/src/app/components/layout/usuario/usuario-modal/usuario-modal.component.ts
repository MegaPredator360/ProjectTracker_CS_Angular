import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../../../interface/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../service/usuario.service';
import { UtilityService } from '../../../../utility/utility.service';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrl: './usuario-modal.component.scss'
})
export class UsuarioModalComponent implements OnInit {

  nombreUsuario: string = ""

  constructor(
    private modalActual: MatDialogRef<UsuarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
      this.nombreUsuario = this.datosUsuario.usuaNombre
  }

  usuarioEliminar() {
    this.usuarioService.Eliminar(this.datosUsuario.usuaId).subscribe({
      next: (data) => {
        if (data.status)
        {
          this.utilityService.mostrarAlerta("El usuario fue eliminado", "exito");
          this.modalActual.close("true");
        }
        else
        {
          this.utilityService.mostrarAlerta("No se pudo eliminar el usuario", "error")
        }
      },
      error: (e) => {}
    })
  }
}
