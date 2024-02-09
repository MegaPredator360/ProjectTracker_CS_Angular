import { Component, ViewChild } from '@angular/core';
import { Tarea } from '../../../interface/tarea';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TareaService } from '../../../service/tarea.service';
import { UtilityService } from '../../../utility/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { TareaModalComponent } from './tarea-modal/tarea-modal.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  colunmasTabla: string[] = ['nombre', 'estado', 'acciones']
  dataInicio: Tarea[] = []
  dataListaTarea = new MatTableDataSource(this.dataInicio)
  tareaVacio!: Tarea
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  mensajeVacio: string = "No hay tareas registradas"

  constructor(
    private router: Router,
    private tareaService: TareaService,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private paginator: MatPaginatorIntl
  ) { 
    this.paginator.itemsPerPageLabel = 'Tareas por pagina: ';
  }

  obtenerTareas() {
    this.tareaService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaTarea.data = data.value;
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al cargar las tareas", "error")
        }
      },
      error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al cargar los tareas", "error") }
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  ngAfterViewInit(): void {
    this.dataListaTarea.paginator = this.paginacionTabla
  }

  filtroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataListaTarea.data.length == 0 && filterValue == "") {
      this.mensajeVacio = "No hay tareas registrados"
    }
    else if (this.dataListaTarea.data.length == 0 && filterValue != "") {
      this.mensajeVacio = "No hay tareas que coincidan con: " + filterValue
    }
    else {
      this.dataListaTarea.filter = filterValue.trim().toLocaleLowerCase()
    }
  }

  tareaActualizar(tarea: Tarea) {
    // Almacenar los datos en el servicio
    this.tareaService.setDatosTarea(tarea);

    // Se redigire al usuario a la ruta
    this.router.navigate(['/pages/tarea/formulario'])
  }

  tareaNueva() {
    this.tareaService.setDatosTarea(this.tareaVacio)
    this.router.navigate(['/pages/tarea/formulario'])
  }

  tareaEliminar(tarea: Tarea) {
    this.dialog.open(TareaModalComponent, {
      disableClose: true,
      data: tarea
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") {
        this.obtenerTareas()
      }
    });
  }
}
