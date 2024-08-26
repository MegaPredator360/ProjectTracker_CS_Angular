import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { Tarea } from '../../interfaces/tarea';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TareaService } from '../../services/tarea.service';
import { UtilityService } from '../../services/utility.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditarEstadoComponent } from './modal-editar-estado/modal-editar-estado.component';
import { ModalDetalleTareaComponent } from './modal-detalle-tarea/modal-detalle-tarea.component';

@Component({
  selector: 'app-tarea-usuario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tarea-usuario.component.html',
  styleUrl: './tarea-usuario.component.scss'
})
export class TareaUsuarioComponent {

  colunmasTabla: string[] = ['tareNombre', 'tareProyNombre', 'tareEstaNombre', 'tareCantidadUsuario', 'acciones']
  dataListaTarea = new MatTableDataSource<Tarea[]>([])
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  @ViewChild(MatSort) sortTabla!: MatSort
  mensajeVacio: string = "No hay tareas registradas"
  filterTable: string = ""

  constructor(
    private dialog: MatDialog,
    private tareaService: TareaService,
    private utilityService: UtilityService,
    private paginator: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.paginator.itemsPerPageLabel = 'Tareas por pagina: ';
  }

  obtenerTareas() {
    const usuario = this.utilityService.obtenerSesion()

    this.tareaService.ListaUsuario(parseInt(usuario?.usuarioId!)).subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaTarea.data = data.value;
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al cargar las tareas", "error")
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al cargar los tareas", "error")
        console.log(e)
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
    this.dialog.open(ModalEditarEstadoComponent, {
      disableClose: true,
      data: tarea
    }).afterClosed().subscribe(() => {
      this.obtenerTareas()
    });
  }

  tareaDetalle(tarea: Tarea) {
    this.dialog.open(ModalDetalleTareaComponent, {
      disableClose: true,
      data: tarea
    }).afterClosed().subscribe(() => {
      this.obtenerTareas()
    });
  }
}