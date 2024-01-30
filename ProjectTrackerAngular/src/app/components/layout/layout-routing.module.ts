import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProyectoComponent } from './pages/proyecto/proyecto.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { TareaUsuarioComponent } from './pages/tarea-usuario/tarea-usuario.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: 'usuario', component: UsuarioComponent },
    { path: 'proyecto', component: ProyectoComponent },
    { path: 'tareausuario', component: TareaUsuarioComponent },
    { path: 'tarea', component: TareaComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
