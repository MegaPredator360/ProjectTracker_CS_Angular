import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Tarea } from '../../../../interface/tarea';
import { UtilityService } from '../../../../utility/utility.service';
import { TareaService } from '../../../../service/tarea.service';
import { EstadoService } from '../../../../service/estado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarea-formulario',
  templateUrl: './tarea-formulario.component.html',
  styleUrl: './tarea-formulario.component.scss'
})
export class TareaFormularioComponent {
  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioTarea: FormGroup

  // Lista de Estados
  listaEstado: Estado[] = []

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
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosTarea = this.tareaService.getDatosTarea()

    this.formularioTarea = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estadoId: ['', Validators.required]
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
      error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al obtener la lista de estados", "error") }
    })
  }

  ngOnInit(): void {
    if (this.datosTarea != null) {
      this.formularioTarea.patchValue({
        nombre: this.datosTarea.tareNombre,
        descripcion: this.datosTarea.tareDescripcion
      })

      this.formularioTarea.get('estadoId')?.setValue(this.datosTarea.tareEstaId)
      this.formularioTarea.get('proyectoId')?.setValue(this.datosTarea.tareProyId)
    }
  }

  submitTarea() {
    const tarea: Tarea = {
      tareId: this.datosTarea == null ? 0 : this.datosTarea.tareId,
      tareNombre: this.formularioTarea.value.nombre,
      tareDescripcion: this.formularioTarea.value.descripcion,
      tareProyId: this.formularioTarea.value.proyectoId,
      tareProyNombre: "",
      tareEstaId: this.formularioTarea.value.estadoId,
      tareEstaNombre: ""
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
