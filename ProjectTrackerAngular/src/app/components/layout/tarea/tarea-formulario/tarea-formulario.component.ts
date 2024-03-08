import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Tarea } from '../../../../interface/tarea';
import { UtilityService } from '../../../../utility/utility.service';
import { TareaService } from '../../../../service/tarea.service';
import { EstadoService } from '../../../../service/estado.service';
import { Router } from '@angular/router';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionSelectionChange } from '@angular/material/core';
import { ProyectoService } from '../../../../service/proyecto.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { Proyecto } from '../../../../interface/proyecto';
import { Usuario } from '../../../../interface/usuario';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

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
  selector: 'app-tarea-formulario',
  templateUrl: './tarea-formulario.component.html',
  styleUrl: './tarea-formulario.component.scss',
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: CalendarioFormatoEspañol },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]

})
export class TareaFormularioComponent {
  // Se usará para agregar a los Usuarios Seleccionados
  usuarioSeleccionados: number[] = []

  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioTarea: FormGroup

  // Listas del formulario
  listaEstado: Estado[] = []
  listaProyecto: Proyecto[] = []
  listaUsuario: Usuario[] = []

  // Datos de Tareas
  datosTarea!: Tarea

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"

  // Controla el filtrador del MatSelect para seleccion multiple
  public usuarioFiltroCtrl: FormControl<string | null> = new FormControl<string>('');
  public proyectoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');
  public estadoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');

  // Obtiene la lista de filtrada por la busqueda
  public filtradoUsuario: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);
  public filtradoProyecto: ReplaySubject<Proyecto[]> = new ReplaySubject<Proyecto[]>(1);
  public filtradoEstado: ReplaySubject<Estado[]> = new ReplaySubject<Estado[]>(1);

  // Emite un "Subject" (Emisores de Eventos) cuando el componente del select es cerrado
  protected _onDestroy = new Subject<void>();



  _utilityService!: UtilityService

  constructor(
    private tareaService: TareaService,
    private estadoService: EstadoService,
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosTarea = this.tareaService.getDatosTarea()

    this.formularioTarea = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      estadoId: ['', Validators.required],
      proyectoId: ['', Validators.required],
      usuariosId: [[], Validators.required]
    })

    if (this.datosTarea != null) {
      this.tituloAccion = "Editar"
      this.botonAccion = "Actualizar"
    }

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

    // Lista de Proyectos
    this.proyectoService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaProyecto = data.value
          this.filtrarProyectos()
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de proyectos", "error")
        console.log(e)
      }
    })

    // Lista de Usuarios
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaUsuario = data.value
          this.filtrarUsuarios()
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de usuarios", "error")
        console.log(e)
      }
    })
  }

  seleccionUsuarios(event: MatSelectChange) {
    if (event.source.selected) {
      // El array de usuarios seleccionados contendrá el Id, de los usuarios en el event.value
      this.usuarioSeleccionados = event.value
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

    // Carga la lista inicial
    this.filtradoUsuario.next(this.listaUsuario.slice())
    this.filtradoProyecto.next(this.listaProyecto.slice())
    this.filtradoEstado.next(this.listaEstado.slice())

    // Toma el valor del campo de busqueda por cambios
    this.usuarioFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarUsuarios()
      });

    this.proyectoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarProyectos()
      });

    this.estadoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarEstados()
      });
  }

  submitTarea() {
    const tarea: Tarea = {
      tareId: this.datosTarea == null ? 0 : this.datosTarea.tareId,
      tareNombre: this.formularioTarea.value.nombre,
      tareDescripcion: this.formularioTarea.value.descripcion,
      tareFechaInicio: moment(this.formularioTarea.value.fechaInicio).format('DD/MM/YYYY'),
      tareProyId: this.formularioTarea.value.proyectoId,
      tareProyNombre: "",
      tareEstaId: this.formularioTarea.value.estadoId,
      tareEstaNombre: "",
      tareCantidadUsuario: 0,
      tareUsuaId: this.usuarioSeleccionados.length === 0 ? this.datosTarea.tareUsuaId : this.usuarioSeleccionados
    }

    if (this.datosTarea == null) {
      this.tareaService.Guardar(tarea).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("La tarea fue registrada", "exito")
            this.router.navigate(['../pages/tarea'])
          }
          else {
            this.utilityService.mostrarAlerta("No se pudo registrar la tarea", "error")
            console.log(data.msg)
          }
        },
        error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al registrar la tarea", "error") }
      })
    }
    else {
      this.tareaService.Editar(tarea).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("La tarea fue actualizada", "exito")
            this.router.navigate(['../pages/tarea'])
          }
          else {
            this.utilityService.mostrarAlerta("Ocurrio un error al actualizar la tarea", "error")
            console.log(data.msg)
          }
        },
        error: (e) => {
          this.utilityService.mostrarAlerta("Ocurrio un error al actualizar la tarea", "error")
          console.log(e)
        }
      })
    }
  }

  protected filtrarUsuarios() {
    if (!this.listaUsuario) {
      return;
    }

    // Obtiene el texto de busqueda
    let search = this.usuarioFiltroCtrl.value;

    if (!search) {
      this.filtradoUsuario.next(this.listaUsuario.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    // Filtra los usuarios
    this.filtradoUsuario.next(
      this.listaUsuario.filter(usuario => usuario.usuaNombre.toLowerCase().indexOf(search!) > -1)
    );
  }

  protected filtrarProyectos() {
    if (!this.listaProyecto) {
      return;
    }

    // Obtiene el texto de busqueda
    let search = this.proyectoFiltroCtrl.value;

    if (!search) {
      this.filtradoProyecto.next(this.listaProyecto.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }

    // Filtra la lista de proyectos
    this.filtradoProyecto.next(
      this.listaProyecto.filter(proyecto => proyecto.proyNombre.toLowerCase().indexOf(search!) > -1)
    );
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
