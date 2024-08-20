import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { Tarea } from '../../interfaces/tarea';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { TareaService } from '../../services/tarea.service';
import { UtilityService } from '../../services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ModalBorrarTareaComponent } from './modal-borrar-tarea/modal-borrar-tarea.component';
import { ModalTareaComponent } from './modal-tarea/modal-tarea.component';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  colunmasTabla: string[] = ['tareNombre', 'tareProyNombre', 'tareEstaNombre', 'tareCantidadUsuario', 'acciones']
  dataListaTarea = new MatTableDataSource<Tarea[]>([])
  tareaVacio!: Tarea
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  @ViewChild(MatSort) sortTabla!: MatSort
  mensajeVacio: string = "No hay tareas registradas"
  filterTable: string = ""

  constructor(
    private tareaService: TareaService,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private paginator: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer
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
          console.error(data.msg)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al cargar los tareas", "error")
        console.error(e)
      }
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  ngAfterViewInit(): void {
    this.dataListaTarea.paginator = this.paginacionTabla
    this.dataListaTarea.sort = this.sortTabla;
  }

  cambiarDireccionSort(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  filtroTabla(event: Event) {

    let filterValue: string = "";

    if (event == null) {
      filterValue = "";
    }
    else {
      filterValue = (event.target as HTMLInputElement).value;
    }

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

  filtroVacio() {
    this.filterTable = ""
    this.filtroTabla(null!)
  }

  tareaActualizar(tarea: Tarea) {
    this.dialog.open(ModalTareaComponent, {
      disableClose: true,
      data: tarea
    }).afterClosed().subscribe(() => {
      this.obtenerTareas()
    });
  }

  tareaNueva() {
    this.dialog.open(ModalTareaComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe(() => {
      this.obtenerTareas()
    });
  }

  tareaEliminar(tarea: Tarea) {
    this.dialog.open(ModalBorrarTareaComponent, {
      disableClose: true,
      data: tarea
    }).afterClosed().subscribe(() => {
      this.obtenerTareas()
    });
  }
}
