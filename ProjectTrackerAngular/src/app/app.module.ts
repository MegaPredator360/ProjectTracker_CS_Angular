import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from './shared/shared.service';
import { SnackBarTimedComponent } from './components/material/snack-bar-timed/snack-bar-timed.component';
import { LoginModalComponent } from './components/login/login-modal/login-modal.component';
//import { AuthGuardService } from './Services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    SnackBarTimedComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  //providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }