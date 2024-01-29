import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: "full" },
    { path: 'login', component: LoginComponent, pathMatch: "full" },
    { path: 'pages', loadChildren: () => import("./components/layout/layout.module").then(m => m.LayoutModule)},
    { path: '*', redirectTo: 'pages', pathMatch: "full" }
];