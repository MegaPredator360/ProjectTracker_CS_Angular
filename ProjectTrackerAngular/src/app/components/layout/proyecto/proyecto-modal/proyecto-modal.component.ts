import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from '../../../../interface/proyecto';
import { ProyectoService } from '../../../../service/proyecto.service';
import { UtilityService } from '../../../../utility/utility.service';

@Component({
  selector: 'app-proyecto-modal',
  templateUrl: './proyecto-modal.component.html',
  styleUrl: './proyecto-modal.component.scss'
})
export class ProyectoModalComponent {
  nombreProyecto: string = ""

  constructor(
    private modalActual: MatDialogRef<ProyectoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProyecto: Proyecto,
    private proyectoService: ProyectoService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
      this.nombreProyecto = this.datosProyecto.proyNombre
  }

  proyectoEliminar() {
    this.proyectoService.Eliminar(this.datosProyecto.proyId).subscribe({
      next: (data) => {
        if (data.status)
        {
          this.utilityService.mostrarAlerta("El proyecto fue eliminado", "exito");
          this.modalActual.close("true");
        }
        else
        {
          this.utilityService.mostrarAlerta("No se pudo eliminar el proyecto", "error")
        }
      },
      error: (e) => {}
    })
  }
}
