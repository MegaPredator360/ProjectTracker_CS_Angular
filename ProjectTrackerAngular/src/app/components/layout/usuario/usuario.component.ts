import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../interface/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from '../../../service/usuario.service';
import { UtilityService } from '../../../utility/utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent implements OnInit, AfterViewInit {
  colunmasTabla: string[] = ['cedula', 'nombre', 'correo', 'telefono', 'permiso', 'acciones']
  dataInicio: Usuario[] = []
  dataListaUsuarios = new MatTableDataSource(this.dataInicio)
  usuarioVacio!: Usuario
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  mensajeVacio: string = "No hay usuarios registrados";

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private dialog: MatDialog
  ) { }

  obtenerUsuarios() {
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuarios.data = data.value
        }
      },
      error: (e) => { this.utilityService.mostrarAlerta("¡Ocurrio un error al obtener los usuarios!", "error") }
    })
  }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla
  }

  filtroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

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

  usuarioActualizar(usuario: Usuario) {
    // Almacenar los datos en el servicio
    this.usuarioService.setDatosUsuario(usuario);

    // Se redigire al usuario a la ruta
    this.router.navigate(['/pages/usuario/formulario'])
  }

  usuarioNuevo() {
    this.usuarioService.setDatosUsuario(this.usuarioVacio)
    this.router.navigate(['/pages/usuario/formulario'])
  }

  usuarioEliminar(usuario: Usuario)
  {
    this.dialog.open(UsuarioModalComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true")
      {
        this.obtenerUsuarios()
      }
    });
  }
}
