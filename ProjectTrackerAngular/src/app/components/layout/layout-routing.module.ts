import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TareaComponent } from './tarea/tarea.component';
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { UsuarioFormularioComponent } from './usuario/usuario-formulario/usuario-formulario.component';
import { ProyectoFormularioComponent } from './proyecto/proyecto-formulario/proyecto-formulario.component';
import { TareaFormularioComponent } from './tarea/tarea-formulario/tarea-formulario.component';
import { HomeComponent } from './home/home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { GuardRoleService } from '../../service/guard-role.service';
import { TareaUsuarioFormularioComponent } from './tarea-usuario/tarea-usuario-formulario/tarea-usuario-formulario.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: '*', component: HomeComponent },
    { path: 'usuario', component: UsuarioComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador'] } },
    { path: 'usuario/formulario', component: UsuarioFormularioComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador'] } },
    { path: 'proyecto', component: ProyectoComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador', 'Gerente'] } },
    { path: 'proyecto/formulario', component: ProyectoFormularioComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador', 'Gerente'] } },
    { path: 'tarea', component: TareaComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador', 'Gerente'] } },
    { path: 'tarea/formulario', component: TareaFormularioComponent, canActivate: [GuardRoleService], data: {roles: ['Administrador', 'Gerente'] } },
    { path: 'tareausuario', component: TareaUsuarioComponent, canActivate: [GuardRoleService], data: {roles: ['Usuario'] }  },
    { path: 'tareausuario/formulario', component: TareaUsuarioFormularioComponent, canActivate: [GuardRoleService], data: {roles: ['Usuario'] }  },
    { path: 'accessdenied', component: AccessDeniedComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }