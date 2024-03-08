import { Component, ViewChild } from '@angular/core';
import { Tarea } from '../../../interface/tarea';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TareaService } from '../../../service/tarea.service';
import { UtilityService } from '../../../utility/utility.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tarea-usuario',
  templateUrl: './tarea-usuario.component.html',
  styleUrl: './tarea-usuario.component.scss'
})
export class TareaUsuarioComponent {
  colunmasTabla: string[] = ['tareNombre', 'tareProyNombre', 'tareEstaNombre', 'tareCantidadUsuario', 'acciones']
  dataInicio: Tarea[] = []
  dataListaTarea = new MatTableDataSource(this.dataInicio)
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  @ViewChild(MatSort) sortTabla!: MatSort
  mensajeVacio: string = "No hay tareas registradas"

  constructor(
    private router: Router,
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
    this.router.navigate(['/pages/tareausuario/formulario'])
  }
}
