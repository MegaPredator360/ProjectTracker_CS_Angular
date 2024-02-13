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
import { ProyectoFormularioComponent } from './proyecto/proyecto-formulario/proyecto-formulario.component';
import { ProyectoModalComponent } from './proyecto/proyecto-modal/proyecto-modal.component';
import { TareaFormularioComponent } from './tarea/tarea-formulario/tarea-formulario.component';
import { TareaModalComponent } from './tarea/tarea-modal/tarea-modal.component';
import { TareaUsuarioModalComponent } from './tarea-usuario/tarea-usuario-modal/tarea-usuario-modal.component';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { HomeComponent } from './home/home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [
    NumbersOnlyDirective,
    UsuarioComponent,
    UsuarioFormularioComponent,
    ProyectoComponent,
    TareaComponent,
    TareaUsuarioComponent,
    UsuarioModalComponent,
    ProyectoFormularioComponent,
    ProyectoModalComponent,
    TareaFormularioComponent,
    TareaModalComponent,
    TareaUsuarioModalComponent,
    HomeComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }
