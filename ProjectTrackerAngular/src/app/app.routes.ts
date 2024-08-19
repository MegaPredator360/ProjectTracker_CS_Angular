import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GuardAuthService } from './services/guard-auth.service';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ConfiguracionUsuarioComponent } from './components/configuracion-usuario/configuracion-usuario.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { TareaUsuarioComponent } from './components/tarea-usuario/tarea-usuario.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: "full" },
    { path: '', component: LayoutComponent, /*canActivate: [GuardAuthService],*/ children: [
            { path: '', component: HomeComponent },
            { path: '*', component: NotFoundComponent },
            { path: 'usuario', component: UsuarioComponent, /*canActivate: [GuardRoleService], data: { roles: ['Administrador'] }*/ },
            { path: 'usuario/configuracion', component: ConfiguracionUsuarioComponent },
            { path: 'proyecto', component: ProyectoComponent, /*canActivate: [GuardRoleService], data: { roles: ['Administrador', 'Gerente'] }*/ },
            { path: 'tarea', component: TareaComponent, /*canActivate: [GuardRoleService], data: { roles: ['Administrador', 'Gerente'] }*/ },
            { path: 'tareausuario', component: TareaUsuarioComponent, /*canActivate: [GuardRoleService], data: { roles: ['Usuario'] }*/ },
            { path: 'accessdenied', component: AccessDeniedComponent }
        ]
    },
    { path: '*', component: NotFoundComponent }
];
