import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Proyecto } from '../../interfaces/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { UtilityService } from '../../services/utility.service';
import { ModalBorrarProyectoComponent } from './modal-borrar-proyecto/modal-borrar-proyecto.component';
import { SharedModule } from '../../modules/shared.module';
import { ModalProyectoComponent } from './modal-proyecto/modal-proyecto.component';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss'
})
export class ProyectoComponent {
  colunmasTabla: string[] = ['proyNombre', 'proyFechaInicio', 'proyEstaNombre', 'proyCantidadTarea', 'acciones']
  dataInicio: Proyecto[] = []
  dataListaProyecto = new MatTableDataSource(this.dataInicio)
  proyectoVacio!: Proyecto
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  @ViewChild(MatSort) sortTabla!: MatSort
  mensajeVacio: string = "No hay proyectos registrados"
  filterTable: string = ""

  constructor(
    private router: Router,
    private proyectoService: ProyectoService,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private paginator: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.paginator.itemsPerPageLabel = 'Proyectos por pagina: ';
  }

  obtenerProyectos() {
    this.proyectoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProyecto.data = data.value;
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al cargar los proyectos", "error")
        }
      },
      error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al cargar los proyectos", "error") }
    });
  }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  ngAfterViewInit(): void {
    this.dataListaProyecto.paginator = this.paginacionTabla
    this.dataListaProyecto.sort = this.sortTabla;
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

    if (this.dataListaProyecto.data.length == 0 && filterValue == "") {
      this.mensajeVacio = "No hay proyectos registrados"
    }
    else if (this.dataListaProyecto.data.length == 0 && filterValue != "") {
      this.mensajeVacio = "No hay proyectos que coincidan con: " + filterValue
    }
    else {
      this.dataListaProyecto.filter = filterValue.trim().toLocaleLowerCase()
    }
  }

  filtroVacio() {
    this.filterTable = ""
    this.filtroTabla(null!)
  }

  proyectoActualizar(proyecto: Proyecto) {
    this.dialog.open(ModalProyectoComponent, {
      disableClose: true,
      data: proyecto
    }).afterClosed().subscribe(() => {
      this.obtenerProyectos();
    });
  }

  proyectoNuevo() {
    this.dialog.open(ModalProyectoComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe(() => {
      this.obtenerProyectos();
    });
  }

  proyectoEliminar(proyecto: Proyecto) {
    this.dialog.open(ModalBorrarProyectoComponent, {
      disableClose: true,
      data: proyecto
    }).afterClosed().subscribe(() => {
      this.obtenerProyectos()
    });
  }
}
