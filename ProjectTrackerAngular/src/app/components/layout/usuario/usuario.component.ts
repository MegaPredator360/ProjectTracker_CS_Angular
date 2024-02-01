import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../interface/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from '../../../service/usuario.service';
import { UtilityService } from '../../../utility/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent implements OnInit, AfterViewInit {
  colunmasTabla: string[] = ['cedula', 'nombre', 'correo', 'telefono', 'permiso', 'acciones'];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  usuarioVacio!: Usuario

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService
  ) { }

  obtenerUsuarios() {
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuarios.data = data.value;
        }
        else {
          //this.utilityService.mostrarAlerta("No se encontraton datos", "Oops!")
          console.log("No hay datos")
        }
      },
      error: (e) => { }
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  usuarioActualizar(usuario: Usuario) {
    // Almacenar los datos en el servicio
    this.usuarioService.setDatosUsuario(usuario);
    this.router.navigate(['/pages/usuario/formulario']);
  }

  usuarioNuevo() {
    this.usuarioService.setDatosUsuario(this.usuarioVacio);
    // Example: Redirect to the 'about' route
    this.router.navigate(['/pages/usuario/formulario']);
  }
}
