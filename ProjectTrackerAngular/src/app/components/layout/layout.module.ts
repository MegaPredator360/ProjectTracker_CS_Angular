import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TareaComponent } from './tarea/tarea.component';
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { SharedModule } from '../../shared/shared.service';
import { UsuarioFormularioComponent } from './usuario/usuario-formulario/usuario-formulario.component';
import { UsuarioModalComponent } from './usuario/usuario-modal/usuario-modal.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormularioComponent,
    ProyectoComponent,
    TareaComponent,
    TareaUsuarioComponent,
    UsuarioModalComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }
