import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from '../../../interfaces/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { UtilityService } from '../../../services/utility.service';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-modal-borrar-proyecto',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-borrar-proyecto.component.html',
  styleUrl: './modal-borrar-proyecto.component.scss'
})
export class ModalBorrarProyectoComponent {
  nombreProyecto: string = ""

  constructor(
    private modalActual: MatDialogRef<ModalBorrarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProyecto: Proyecto,
    private proyectoService: ProyectoService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.nombreProyecto = this.datosProyecto.proyNombre
  }

  proyectoEliminar() {
    this.proyectoService.Eliminar(this.datosProyecto.proyId).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("El proyecto fue eliminado", "exito");
          this.modalActual.close("true");
        }
        else {
          this.utilityService.mostrarAlerta("No se pudo eliminar el proyecto", "error")
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al eliminar el proyecto", "error")
        console.log(e)
      }
    })
  }
}
