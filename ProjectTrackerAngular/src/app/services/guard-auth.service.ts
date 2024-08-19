import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class GuardAuthService {

    constructor(private utilityService: UtilityService, private router: Router) { }

    // Si no hay sesion iniciada, te regresará a la pagina de inicio de sesion
    canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.utilityService.obtenerSesion()) {
            this.router.navigate(['/login']);
            //this.utilityService.mostrarAlerta("Debes de iniciar sesion para acceder a esta pagina", "error")
            return false;
        }
        return true;
    }
}