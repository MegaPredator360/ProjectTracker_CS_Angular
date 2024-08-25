import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estado } from '../../../interfaces/estado';
import { Proyecto } from '../../../interfaces/proyecto';
import { Usuario } from '../../../interfaces/usuario';
import { UtilityService } from '../../../services/utility.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from '../../../interfaces/tarea';
import { EstadoService } from '../../../services/estado.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { UsuarioService } from '../../../services/usuario.service';
import moment from 'moment';
import { SharedModule } from '../../../modules/shared.module';
import { AsyncPipe, NgForOf } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export const CalendarioFormatoEspañol = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-modal-detalle-tarea',
  standalone: true,
  imports: [SharedModule, AsyncPipe, NgForOf],
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: CalendarioFormatoEspañol },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  templateUrl: './modal-detalle-tarea.component.html',
  styleUrl: './modal-detalle-tarea.component.scss'
})

export class ModalDetalleTareaComponent {

  // Se usará para agregar a los Usuarios Seleccionados
  usuarioSeleccionados: number[] = []

  // Datos de Usuarios
  dataListaUsuario = new MatTableDataSource<Usuario>([]);
  colunmasTabla: string[] = ['usuaCedula', 'usuaNombre', 'usuaCorreo', 'usuaTelefono', 'usuaPermNombre'];
  @ViewChild(MatSort) sortTabla!: MatSort

  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioTarea: FormGroup

  // Listas del formulario
  listaEstado: Estado[] = []
  listaProyecto: Proyecto[] = []
  listaUsuario: Usuario[] = []

  constructor(
    private modalActual: MatDialogRef<ModalDetalleTareaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosTarea: Tarea,
    private estadoService: EstadoService,
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder
  ) {
    this.formularioTarea = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      descripcion: [{ value: '', disabled: true }],
      fechaInicio: [{ value: '', disabled: true }],
      estadoId: [{ value: '', disabled: true }],
      proyectoId: [{ value: '', disabled: true }],
      usuariosId: [[]]
    })

    // Lista de Estados
    this.estadoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaEstado = data.value
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de estados", "error")
        console.error(e)
      }
    })

    // Lista de Proyectos
    this.proyectoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaProyecto = data.value
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de proyectos", "error")
        console.error(e)
      }
    })

    // Lista de Usuarios
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaUsuario.data = data.value

          // Ordenamientos de tabla
          this.dataListaUsuario.sort = this.sortTabla;

          // Se obtienen los ids de los usuarios seleccionados
          this.usuarioSeleccionados = this.datosTarea.tareUsuaId.map((usuario) => usuario);

          // Se filtran los usuarios
          this.dataListaUsuario.filterPredicate = (data: Usuario, filter: string) => {
            return this.usuarioSeleccionados.includes(data.usuaId)
          };

          // Se aplica el filtro de usuarios
          this.dataListaUsuario.filter = JSON.stringify(this.usuarioSeleccionados)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de usuarios", "error")
        console.error(e)
      }
    })
  }

  cambiarDireccionSort(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    if (this.datosTarea != null) {
      this.formularioTarea.patchValue({
        nombre: this.datosTarea.tareNombre,
        descripcion: this.datosTarea.tareDescripcion,
        fechaInicio: moment(this.datosTarea.tareFechaInicio, "DD/MM/YYYY")
      })

      this.formularioTarea.get('estadoId')?.setValue(this.datosTarea.tareEstaId)
      this.formularioTarea.get('proyectoId')?.setValue(this.datosTarea.tareProyId)
      this.formularioTarea.get('usuariosId')?.setValue(this.datosTarea.tareUsuaId.map((usuario) => usuario))
    }
  }

  cerrarDialog() {
    this.modalActual.close()
  }
}
