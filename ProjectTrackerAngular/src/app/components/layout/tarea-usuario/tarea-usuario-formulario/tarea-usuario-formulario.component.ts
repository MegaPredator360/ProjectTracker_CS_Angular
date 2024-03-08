import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Usuario } from '../../../../interface/usuario';
import { Tarea } from '../../../../interface/tarea';
import { UtilityService } from '../../../../utility/utility.service';
import { TareaService } from '../../../../service/tarea.service';
import { EstadoService } from '../../../../service/estado.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tarea-usuario-formulario',
  templateUrl: './tarea-usuario-formulario.component.html',
  styleUrl: './tarea-usuario-formulario.component.scss'
})

export class TareaUsuarioFormularioComponent {
  // Se usará para agregar a los Usuarios Seleccionados
  usuarioSeleccionados: number[] = []

  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioTarea: FormGroup

  // Listas del formulario
  listaEstado: Estado[] = []
  listaUsuario: Usuario[] = []

  // Datos de Tareas
  datosTarea!: Tarea

    // Obtiene la lista de filtrada por la busqueda
    public filtradoEstado: ReplaySubject<Estado[]> = new ReplaySubject<Estado[]>(1);

    // Controla el filtrador del MatSelect para seleccion multiple
    public estadoFiltroCtrl: FormControl<string | null> = new FormControl<string>('');
  
    // Emite un "Subject" (Emisores de Eventos) cuando el componente del select es cerrado
    protected _onDestroy = new Subject<void>();

  _utilityService!: UtilityService

  constructor(
    private tareaService: TareaService,
    private estadoService: EstadoService,
    private usuarioService: UsuarioService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosTarea = this.tareaService.getDatosTarea()

    this.formularioTarea = this.fb.group({
      nombre: [''],
      descripcion: [''],
      fechaInicio: [''],
      estadoId: ['', Validators.required],
      proyectoNombre: [''],
      usuariosId: [[]]
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

    // Lista de Usuarios
    this.usuarioService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listaUsuario = data.value
        }
      },
      error: (e) => {
        this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de usuarios", "error")
        console.log(e)
      }
    })
  }

  onSelectChange(event: MatSelectChange) {
    if (event.source.selected) {
      // El array de usuarios seleccionados contendrá el Id, de los usuarios en el event.value
      this.usuarioSeleccionados = event.value
    }
  }

  ngOnInit(): void {
    this.formularioTarea.patchValue({
      nombre: this.datosTarea.tareNombre,
      descripcion: this.datosTarea.tareDescripcion,
      fechaInicio: this.datosTarea.tareFechaInicio,
      proyectoNombre: this.datosTarea.tareProyNombre
    })

    this.formularioTarea.get('estadoId')?.setValue(this.datosTarea.tareEstaId)
    this.formularioTarea.get('usuariosId')?.setValue(this.datosTarea.tareUsuaId.map((usuario) => usuario))

    // Deshabilitar los campos para que no puedan ser editados por el el usuario
    this.formularioTarea.get('nombre')?.disable()
    this.formularioTarea.get('descripcion')?.disable()
    this.formularioTarea.get('fechaInicio')?.disable()
    this.formularioTarea.get('proyectoNombre')?.disable()
    this.formularioTarea.get('usuariosId')?.disable()

    // Carga la lista inicial
    this.filtradoEstado.next(this.listaEstado.slice())

    // Toma el valor del campo de busqueda por cambios
    this.estadoFiltroCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarEstados()
      });
  }

  submitTarea() {
    const tarea: Tarea = {
      tareId: this.datosTarea == null ? 0 : this.datosTarea.tareId,
      tareNombre: this.datosTarea.tareNombre,
      tareDescripcion: this.datosTarea.tareDescripcion,
      tareFechaInicio: this.datosTarea.tareFechaInicio,
      tareProyId: this.datosTarea.tareProyId,
      tareProyNombre: "",
      tareEstaId: this.formularioTarea.value.estadoId,
      tareEstaNombre: "",
      tareCantidadUsuario: 0,
      tareUsuaId: this.usuarioSeleccionados.length === 0 ? this.datosTarea.tareUsuaId : this.usuarioSeleccionados
    }

    this.tareaService.Editar(tarea).subscribe({
      next: (data) => {
        if (data.status) {
          this.utilityService.mostrarAlerta("La tarea fue actualizada", "exito")
          this.router.navigate(['../pages/tareausuario'])
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