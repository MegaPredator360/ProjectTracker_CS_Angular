import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Proyecto } from '../../../../interface/proyecto';
import { UtilityService } from '../../../../utility/utility.service';
import { ProyectoService } from '../../../../service/proyecto.service';
import { EstadoService } from '../../../../service/estado.service';
import { Router } from '@angular/router';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

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
  selector: 'app-proyecto-formulario',
  templateUrl: './proyecto-formulario.component.html',
  styleUrl: './proyecto-formulario.component.scss',
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class ProyectoFormularioComponent {
  // Se usará para verificar o autollenar el formulario con informacion existente
  formularioProyecto: FormGroup

  // Lista de Estados
  listaEstado: Estado[] = []

  // Datos de Proyectos
  datosProyecto!: Proyecto

  // Ttiulo del componente
  tituloAccion: string = "Agregar"

  // Titulo del boton del componente
  botonAccion: string = "Guardar"

  _utilityService!: UtilityService

  constructor(
    private proyectoService: ProyectoService,
    private estadoService: EstadoService,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosProyecto = this.proyectoService.getDatosProyecto()

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

    // Lista de Permisos
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
    if (this.datosProyecto != null) {
      this.formularioProyecto.patchValue({
        nombre: this.datosProyecto.proyNombre,
        descripcion: this.datosProyecto.proyDescripcion,
        fechaInicio: moment(this.datosProyecto.proyFechaInicio, "DD/MM/YYYY")
      })

      this.formularioProyecto.get('estadoId')?.setValue(this.datosProyecto.proyEstaId)
    }
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
            this.router.navigate(['../pages/proyecto']);
          }
          else {
            this.utilityService.mostrarAlerta("No se pudo registrar el proyecto", "error")
          }
        },
        error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al registrar el proyecto", "error") }
      })
    }
    else {
      this.proyectoService.Editar(proyecto).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.mostrarAlerta("El proyecto fue actualizado", "exito");
            this.router.navigate(['../pages/proyecto']);
          }
          else {
            this.utilityService.mostrarAlerta("Ocurrio un error al actualizar el proyecto", "error");
          }
        },
        error: (e) => { this.utilityService.mostrarAlerta("Ocurrio un error al registrar el proyecto", "error") }
      })
    }
  }
}
