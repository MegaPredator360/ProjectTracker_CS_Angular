import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GuardAuthService } from './service/guard-auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: "full" },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'pages', loadChildren: () => import("./components/layout/layout.module").then(m => m.LayoutModule), canActivate: [GuardAuthService] },
  { path: '*', redirectTo: 'pages', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }