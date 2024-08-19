import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})

export class GuardRoleService {

    constructor(private utilityService: UtilityService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot
    ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
            this.router.navigate(['/pages/accessdenied']);
            return false
        }
    }
}