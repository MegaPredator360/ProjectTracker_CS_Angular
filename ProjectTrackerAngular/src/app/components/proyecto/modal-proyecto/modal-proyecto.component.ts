import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Estado } from '../../../interfaces/estado';
import { Proyecto } from '../../../interfaces/proyecto';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { UtilityService } from '../../../services/utility.service';
import { ProyectoService } from '../../../services/proyecto.service';
import { EstadoService } from '../../../services/estado.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { SharedModule } from '../../../modules/shared.module';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-modal-proyecto',
  standalone: true,
  imports: [SharedModule, AsyncPipe, NgForOf],
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: CalendarioFormatoEspañol },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  templateUrl: './modal-proyecto.component.html',
  styleUrl: './modal-proyecto.component.scss'
})

export class ModalProyectoComponent {

  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioProyecto: FormGroup

  // Lista de Estados
  listaEstado: Estado[] = []

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"

  // Obtiene la lista de filtrada por la busqueda
  public filtradoEstado: ReplaySubject<Estado[]> = new ReplaySubject<Estado[]>(1);

  // Controla el filtrador del MatSelect para seleccion multiple
  public estadoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');

  // Emite un "Subject" (Emisores de Eventos) cuando el componente del select es cerrado
  protected _onDestroy = new Subject<void>();

  _utilityService!: UtilityService

  constructor(
    private modalActual: MatDialogRef<ModalProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProyecto: Proyecto,
    private proyectoService: ProyectoService,
    private estadoService: EstadoService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.formularioProyecto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      estadoId: ['', Validators.required]
    })

    if (this.datosProyecto != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    // Lista de Estados
    this.estadoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaEstado = data.value
          this.filtrarEstados()
        }
      },
      error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de estados", "error") }
    })
  }

  ngOnInit(): void {
    if (this.datosProyecto != null) {
      this.formularioProyecto.patchValue({
        nombre: this.datosProyecto.proyNombre,
        descripcion: this.datosProyecto.proyDescripcion,
        fechaInicio: moment(this.datosProyecto.proyFechaInicio, "DD/MM/YYYY")
      })

      this.formularioProyecto.get('estadoId')?.setValue(this.datosProyecto.proyEstaId)
    }

    // Carga la lista inicial
    this.filtradoEstado.next(this.listaEstado.slice())

    // Toma el valor del campo de busqueda por cambios
    this.estadoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarEstados()
      });
  }

  submitProyecto() {
    const proyecto: Proyecto = {
      proyId: this.datosProyecto == null ? 0 : this.datosProyecto.proyId,
      proyNombre: this.formularioProyecto.value.nombre,
      proyDescripcion: this.formularioProyecto.value.descripcion,
      proyFechaInicio: moment(this.formularioProyecto.value.fechaInicio).format('DD/MM/YYYY'),
      proyEstaId: this.formularioProyecto.value.estadoId,
      proyEstaNombre: "",
      proyCantidadTarea: 0
    }

    if (this.datosProyecto == null) {
      this.proyectoService.Guardar(proyecto).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El proyecto fue registrado", "exito");
            this.modalActual.close();
          }
          else {
            this.utilityService.mostrarAlerta("No se pudo registrar el proyecto", "error")
            console.error(data.msg)
          }
        },
        error: (e) => { 
          this.utilityService.mostrarAlerta("Ocurrio un error al registrar el proyecto", "error")
          console.error(e)
        }
      })
    }
    else {
      this.proyectoService.Editar(proyecto).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El proyecto fue actualizado", "exito");
            this.modalActual.close();
          }
          else {
            this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el proyecto", "error");
            console.error(data.msg)
          }
        },
        error: (e) => { 
          this.utilityService.mostrarAlerta("Ocurrio un error al registrar el proyecto", "error")
          console.error(e)
        }
      })
    }
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
