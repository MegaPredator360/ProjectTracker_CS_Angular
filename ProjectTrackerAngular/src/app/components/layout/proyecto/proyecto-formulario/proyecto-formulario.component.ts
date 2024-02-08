import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../../interface/estado';
import { Proyecto } from '../../../../interface/proyecto';
import { UtilityService } from '../../../../utility/utility.service';
import { ProyectoService } from '../../../../service/proyecto.service';
import { EstadoService } from '../../../../service/estado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto-formulario',
  templateUrl: './proyecto-formulario.component.html',
  styleUrl: './proyecto-formulario.component.scss'
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
    private elementRef: ElementRef,
    private router: Router
  ) {
    // Obtener los datos almacenados en el servicio
    this.datosProyecto = this.proyectoService.getDatosProyecto()

    this.formularioProyecto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
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
      error: (e) => { }
    })
  }

  ngOnInit(): void {
    if (this.datosProyecto != null) {
      this.formularioProyecto.patchValue({
        nombre: this.datosProyecto.proyNombre,
        descripcion: this.datosProyecto.proyDescripcion
      })

      this.formularioProyecto.get('estadoId')?.setValue(this.datosProyecto.proyEstaId)
    }
  }

  submitProyecto() {
    const proyecto: Proyecto = {
      proyId: this.datosProyecto == null ? 0 : this.datosProyecto.proyId,
      proyNombre: this.formularioProyecto.value.nombre,
      proyDescripcion: this.formularioProyecto.value.descripcion,
      proyEstaId: this.formularioProyecto.value.estadoId,
      proyEstaNombre: ""
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
        error: (e) => { }
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
        error: (e) => { }
      })
    }
  }
}
