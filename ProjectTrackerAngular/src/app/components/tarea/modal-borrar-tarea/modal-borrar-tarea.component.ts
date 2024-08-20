import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from '../../../interfaces/tarea';
import { TareaService } from '../../../services/tarea.service';
import { UtilityService } from '../../../services/utility.service';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-modal-borrar-tarea',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-borrar-tarea.component.html',
  styleUrl: './modal-borrar-tarea.component.scss'
})
export class ModalBorrarTareaComponent {
  nombreTarea: string = ""

  constructor(
    private modalActual: MatDialogRef<ModalBorrarTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosTarea: Tarea,
    private tareaService: TareaService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.nombreTarea = this.datosTarea.tareNombre
  }

  tareaEliminar() {
    this.tareaService.Eliminar(this.datosTarea.tareId).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("La tarea fue eliminada", "exito");
          this.modalActual.close("true");
        }
        else {
          this.utilityService.mostrarAlerta("No se pudo eliminar la tarea", "error")
          console.error(data.msg)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al eliminar la tarea", "error")
        console.error(e)
      }
    })
  }
}
