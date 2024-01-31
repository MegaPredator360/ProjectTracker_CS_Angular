import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TareaComponent } from './tarea/tarea.component';
import { TareaUsuarioComponent } from './tarea-usuario/tarea-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
//import { RoleGuard } from 'src/app/Services/role-guard.service';
//import { AccesoDenegadoComponent } from './Pages/acceso-denegado/acceso-denegado.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'usuario', component: UsuarioComponent },
    { path: 'proyecto', component: ProyectoComponent },
    { path: 'tarea', component: TareaComponent },
    { path: 'tareausuario', component: TareaUsuarioComponent }
    //{ path: 'Producto', component: ProductoComponent, canActivate: [RoleGuard], data: {roles: ['Administrador', 'Supervisor'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }