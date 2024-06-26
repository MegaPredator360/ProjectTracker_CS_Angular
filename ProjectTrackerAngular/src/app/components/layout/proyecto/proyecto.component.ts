import { Component, ViewChild } from '@angular/core';
import { Proyecto } from '../../../interface/proyecto';
import { ProyectoService } from '../../../service/proyecto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UtilityService } from '../../../utility/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { ProyectoModalComponent } from './proyecto-modal/proyecto-modal.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-proyecto',
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
    const filterValue = (event.target as HTMLInputElement).value;

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

  proyectoActualizar(proyecto: Proyecto) {
    // Almacenar los datos en el servicio
    this.proyectoService.setDatosProyecto(proyecto);

    // Se redigire al usuario a la ruta
    this.router.navigate(['/pages/proyecto/formulario'])
  }

  proyectoNuevo() {
    this.proyectoService.setDatosProyecto(this.proyectoVacio)
    this.router.navigate(['/pages/proyecto/formulario'])
  }

  proyectoEliminar(proyecto: Proyecto) {
    this.dialog.open(ProyectoModalComponent, {
      disableClose: true,
      data: proyecto
    }).afterClosed().subscribe(resultado => {
      this.obtenerProyectos()
    });
  }
}
