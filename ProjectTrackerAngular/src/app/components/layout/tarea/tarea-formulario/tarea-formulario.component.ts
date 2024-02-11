import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Tarea } from '../../../../interface/tarea';
import { UtilityService } from '../../../../utility/utility.service';
import { TareaService } from '../../../../service/tarea.service';
import { EstadoService } from '../../../../service/estado.service';
import { Router } from '@angular/router';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MatOptionSelectionChange } from '@angular/material/core';
import { ProyectoService } from '../../../../service/proyecto.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { Proyecto } from '../../../../interface/proyecto';
import { Usuario } from '../../../../interface/usuario';
import { MatSelectChange } from '@angular/material/select';
import moment from 'moment';
import { TareaUsuario } from '../../../../interface/tarea-usuario';

export const MY_DATE_FORMATS = {
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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
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


  //this.usuarioSeleccionados.push(this.listaUsuario.find((u) => u.usuaId === parseInt(usuarioId, 10))!)

  ngOnInit(): void {
    if (this.datosTarea != null) {
      this.formularioTarea.patchValue({
        nombre: this.datosTarea.tareNombre,
        descripcion: this.datosTarea.tareDescripcion,
        fechaInicio: moment(this.datosTarea.tareFechaInicio, "DD/MM/YYYY")
      })

      this.formularioTarea.get('estadoId')?.setValue(this.datosTarea.tareEstaId)
      this.formularioTarea.get('proyectoId')?.setValue(this.datosTarea.tareProyId)
      this.formularioTarea.get('usuariosId')?.setValue(this.datosTarea.tareaUsuarios)
    }
  }

  submitTarea() {

    const tareaUsuarioSeleccionado: TareaUsuario[] = this.usuarioSeleccionados.map((usuarioId) => ({
      usuaId: usuarioId,
      tareId: this.datosTarea == null ? 0 : this.datosTarea.tareId
    }))

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
      tareaUsuarios: tareaUsuarioSeleccionado
    }

    console.log(tarea)

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
          }
        },
        error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al actualizar", "error") }
      })
    }
  }
}
