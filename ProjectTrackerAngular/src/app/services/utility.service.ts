import { Injectable } from '@angular/core';
import { Sesion } from '../interfaces/sesion';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { SnackBarTimedComponent } from '../components/material/snack-bar-timed/snack-bar-timed.component';

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    user!: Sesion;
    snackBarClass!: string
    snackBarMessage!: string

    constructor(
        private snackBar: MatSnackBar
    ) {
        this.snackBarMessage = ''
    }

    guardarSesionUsuario(token: string) {
        localStorage.setItem("token", JSON.stringify(token))
    }

    obtenerSesion(): Sesion {
        const dataCadena = localStorage.getItem("token")

        if (dataCadena != null) {
            return JSON.parse(atob(dataCadena!.split('.')[1])) as Sesion
        }
        else {
            return this.user;
        }
    }

    eliminarSesionUsuario() {
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

    verificarCorreo(correo: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(correo);
    }

    /*
    // Se usará para mostrar mensajes de Alerta
    mostrarAlerta(mensaje: string, tipoMensaje: string) {
        // Definimos el tipo de mensaje
        if (tipoMensaje == "exito") {
            this.snackBarClass = "successSnackBar"
        }
        else if (tipoMensaje == "error") {
            this.snackBarClass = "dangerSnackBar"
        }

        // Mandamos el mensaje
        this.snackBarMessage = mensaje

        this.snackBar.openFromComponent(
            SnackBarTimedComponent, {
            duration: 5000,
            panelClass: [this.snackBarClass],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        })
    }

    obtenerSnackBarMessage(): string {
        return this.snackBarMessage;
    }
        */
}