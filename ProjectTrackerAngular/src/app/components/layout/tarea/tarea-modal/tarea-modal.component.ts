import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from '../../../../interface/tarea';
import { TareaService } from '../../../../service/tarea.service';
import { UtilityService } from '../../../../utility/utility.service';

@Component({
  selector: 'app-tarea-modal',
  templateUrl: './tarea-modal.component.html',
  styleUrl: './tarea-modal.component.scss'
})
export class TareaModalComponent {
  nombreTarea: string = ""

  constructor(
    private modalActual: MatDialogRef<TareaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datosTarea: Tarea,
    private tareaService: TareaService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
      this.nombreTarea = this.datosTarea.tareNombre
  }

  tareaEliminar() {
    this.tareaService.Eliminar(this.datosTarea.tareId).subscribe({
      next: (data) => {
        if (data.status)
        {
          this.utilityService.mostrarAlerta("La tarea fue eliminada", "exito");
          this.modalActual.close("true");
        }
        else
        {
          this.utilityService.mostrarAlerta("No se pudo eliminar la tarea", "error")
          console.log(data.msg)
        }
      },
      error: (e) => { 
        this.utilityService.mostrarAlerta("Ocurrio un error al eliminar la tarea", "error")
        console.log(e)
      }
    })
  }
}
