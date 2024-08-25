import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class GuardAuthService {

    constructor(private utilityService: UtilityService, private router: Router) { }

    // Si no hay sesion iniciada, te regresará a la pagina de inicio de sesion
    canActivate(route: ActivatedRouteSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.utilityService.obtenerSesion()) {
            this.router.navigate(['/login']);
            this.utilityService.mostrarAlerta("Debes de iniciar sesion para acceder a esta pagina", "error")
            return false;
        }
        else {
            // Se obtiene el usuario, y se verifica y tiene el permiso indicado
            const usuario = this.utilityService.obtenerSesion();
            const routeRoles = route.data['roles'];
            if (usuario!.permisoId == "1" && routeRoles[0] == "Administrador") {
                return true;
            }
            else if (usuario!.permisoId == "2" && routeRoles[1] == "Gerente") {
                return true;
            }
            else if (usuario!.permisoId == "3" && routeRoles[0] == "Usuario") {
                return true;
            }
            else {
                this.router.navigate(['/accessdenied']);
                return false
            }
        }
    }
}