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
}