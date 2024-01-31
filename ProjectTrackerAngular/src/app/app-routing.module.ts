import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
//import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'pages/venta', pathMatch: "full" },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'pages', loadChildren: () => import("./components/layout/layout.module").then(m => m.LayoutModule) },
  //{ path: 'Pages', loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule), canActivate: [AuthGuardService] },
  { path: '*', redirectTo: 'pages/venta', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }