import { Injectable } from '@angular/core';
import { Sesion } from '../interface/sesion';

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    user!: Sesion;

    guardarSesionUsuario(token: string)
    {
        localStorage.setItem("token", JSON.stringify(token))
    }

    obtenerSesion()
    {
        const dataCadena = localStorage.getItem("token")

        if (dataCadena != null)
        {
            return JSON.parse(atob(dataCadena!.split('.')[1])) as Sesion
        }
        else
        {
            return null;
        }
    }

    eliminarSesionUsuario()
    {
        localStorage.removeItem("token")
    }

    // Se usará para verificar que la contraseña con las condiciones necesarias
    verificarContrasena(_contrasena: string): boolean {
        const hasUppercase = /[A-Z]/.test(_contrasena);
        const hasLowercase = /[a-z]/.test(_contrasena);
        const hasNumber = /\d/.test(_contrasena);
        const hasSymbol = /[\W_]/.test(_contrasena);

        // Si se cumplen todas las condiciones, retorna un true
        if (hasUppercase && hasLowercase && hasNumber && hasSymbol && _contrasena.length >= 8) {
            return true
        } 
        else {
            return false
        }
    }
}