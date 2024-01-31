import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TareaComponent } from './tarea/tarea.component';
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { SharedModule } from '../../shared/shared.service';

@NgModule({
  declarations: [
    UsuarioComponent,
    ProyectoComponent,
    TareaComponent,
    TareaUsuarioComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }
