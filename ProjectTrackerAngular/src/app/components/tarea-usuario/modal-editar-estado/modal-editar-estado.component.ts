import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarea } from '../../../interfaces/tarea';
import { TareaService } from '../../../services/tarea.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { EstadoService } from '../../../services/estado.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UtilityService } from '../../../services/utility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estado } from '../../../interfaces/estado';
import { Proyecto } from '../../../interfaces/proyecto';
import { Usuario } from '../../../interfaces/usuario';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';
import { AsyncPipe, NgForOf } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-modal-editar-estado',
  standalone: true,
  imports: [SharedModule, AsyncPipe, NgForOf],
  templateUrl: './modal-editar-estado.component.html',
  styleUrl: './modal-editar-estado.component.scss'
})
export class ModalEditarEstadoComponent {

  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioTarea: FormGroup

  // Listas del formulario
  listaEstado: Estado[] = []

  // Titulo del boton del componente
  botonAccion: string = "Actualizar"

  // Controla el filtrador del MatSelect para seleccion multiple
  public estadoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');

  // Obtiene la lista de filtrada por la busqueda
  public filtradoEstado: ReplaySubject<Estado[]> = new ReplaySubject<Estado[]>(1);

  // Emite un "Subject" (Emisores de Eventos) cuando el componente del select es cerrado
  protected _onDestroy = new Subject<void>();

  _utilityService!: UtilityService

  constructor(
    private modalActual: MatDialogRef<ModalEditarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosTarea: Tarea,
    private tareaService: TareaService,
    private estadoService: EstadoService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
  ) {
    this.formularioTarea = this.fb.group({
      estadoId: ['', Validators.required]
    })

    // Lista de Estados
    this.estadoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaEstado = data.value
          this.filtrarEstados()
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de estados", "error")
        console.log(e)
      }
    })
  }

  ngOnInit(): void {
    if (this.datosTarea != null) {
      this.formularioTarea.get('estadoId')?.setValue(this.datosTarea.tareEstaId)
    }

    // Carga la lista inicial
    this.filtradoEstado.next(this.listaEstado.slice())

    this.estadoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarEstados()
      });
  }

  submitTarea() {
    const tarea: Tarea = {
      tareId: this.datosTarea.tareId,
      tareNombre: this.datosTarea.tareNombre,
      tareDescripcion: this.datosTarea.tareDescripcion,
      tareFechaInicio: this.datosTarea.tareFechaInicio,
      tareProyId: this.datosTarea.tareProyId,
      tareProyNombre: "",
      tareEstaId: this.formularioTarea.value.estadoId,
      tareEstaNombre: "",
      tareCantidadUsuario: 0,
      tareUsuaId: this.datosTarea.tareUsuaId
    }

    this.tareaService.Editar(tarea).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("La tarea fue actualizada", "exito")
          this.modalActual.close()
        }
        else {
          this.utilityService.mostrarAlerta("Ocurrio un error al actualizar la tarea", "error")
          console.error(data.msg)
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al actualizar la tarea", "error")
        console.error(e)
      }
    })
  }

  protected filtrarEstados() {
    if (!this.listaEstado) {
      return;
    }

    // Obtiene el texto de busqueda
    let search = this.estadoFiltroCtrl.value;

    if (!search) {
      this.filtradoEstado.next(this.listaEstado.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    // Filtra la lista de estados
    this.filtradoEstado.next(
      this.listaEstado.filter(estado => estado.estaNombre.toLowerCase().indexOf(search!) > -1)
    );
  }
}
