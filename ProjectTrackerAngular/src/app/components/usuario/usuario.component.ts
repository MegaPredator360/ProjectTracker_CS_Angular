import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { SharedModule } from '../../modules/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { UsuarioService } from '../../services/usuario.service';
import { UtilityService } from '../../services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ModalBorrarUsuarioComponent } from './modal-borrar-usuario/modal-borrar-usuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  colunmasTabla: string[] = ['usuaCedula', 'usuaNombre', 'usuaCorreo', 'usuaTelefono', 'usuaPermNombre', 'acciones']
  dataListaUsuarios = new MatTableDataSource<Usuario[]>
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  @ViewChild(MatSort) sortTabla!: MatSort
  mensajeVacio: string = "No hay usuarios registrados";
  filterTable: string = ""

  constructor(
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private paginator: MatPaginatorIntl,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.paginator.itemsPerPageLabel = 'Usuarios por pagina: ';
  }

  obtenerUsuarios() {
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuarios.data = data.value
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener los usuarios", "error")
        console.error(e)
      }
    })
  }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla
    this.dataListaUsuarios.sort = this.sortTabla;
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

    if (this.dataListaUsuarios.data.length == 0 && filterValue == "") {
      this.mensajeVacio = "No hay usuarios registrados"
    }
    else if (this.dataListaUsuarios.data.length == 0 && filterValue != "") {
      this.mensajeVacio = "No hay usuarios que coincidan con: " + filterValue
    }
    else {
      this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase()
    }
  }

  filtroVacio() {
    this.filterTable = ""
    this.filtroTabla(null!)
  }

  usuarioNuevo() {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  usuarioActualizar(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  usuarioEliminar(usuario: Usuario) {
    this.dialog.open(ModalBorrarUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(() => {
      this.obtenerUsuarios()
    });
  }
}
