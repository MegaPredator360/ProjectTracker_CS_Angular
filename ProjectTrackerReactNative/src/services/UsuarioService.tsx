import { Environment } from "../environments/environment"
import { InicioSesion } from "../interfaces/InicioSesionInterface"
import { Usuario } from "../interfaces/UsuarioInterface"

class UsuarioService {

    urlAPI = Environment.endpoint + "Usuario/"

    async Lista(): Promise<Response> {
        return await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })
    }

    async IniciarSesion(request: InicioSesion): Promise<Response> {
        return await fetch(`${this.urlAPI}IniciarSesion`, {
            method: 'POST',
            body: JSON.stringify({
                correo: request.correo,
                contrasena: request.contrasena
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    async ObtenerUsuario(Id: number): Promise<Response> {
        return await fetch(`${this.urlAPI}Unico/${Id}`, {
            method: 'GET'
        })
    }

    async Guardar(request: Usuario): Promise<Response> {
        return await fetch(`${this.urlAPI}Guardar`, {
            method: 'POST',
            body: JSON.stringify({
                usuaId: request.usuaId,
                usuaCedula: request.usuaCedula,
                usuaNombre: request.usuaNombre,
                usuaUsername: request.usuaNombre,
                usuaCorreo: request.usuaCorreo,
                usuaContrasena: request.usuaContrasena,
                usuaTelefono: request.usuaTelefono,
                usuaDireccion: request.usuaDireccion,
                usuaPrimerInicio: request.usuaPrimerInicio,
                usuaPermId: request.usuaPermId,
                usuaPermNombre: request.usuaPermNombre
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    async Editar(request: Usuario): Promise<Response> {
        return await fetch(`${this.urlAPI}Editar`, {
            method: 'PUT',
            body: JSON.stringify({
                usuaId: request.usuaId,
                usuaCedula: request.usuaCedula,
                usuaNombre: request.usuaNombre,
                usuaUsername: request.usuaNombre,
                usuaCorreo: request.usuaCorreo,
                usuaContrasena: request.usuaContrasena,
                usuaTelefono: request.usuaTelefono,
                usuaDireccion: request.usuaDireccion,
                usuaPrimerInicio: request.usuaPrimerInicio,
                usuaPermId: request.usuaPermId,
                usuaPermNombre: request.usuaPermNombre
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }

    async Eliminar(Id: number): Promise<Response> {
        return await fetch(`${this.urlAPI}Eliminar/${Id}`, {
            method: 'DELETE'
        })
    }

    async CambiarContraseña(request: Usuario): Promise<Response> {
        return await fetch(`${this.urlAPI}CambiarContrasena`, {
            method: 'PUT',
            body: JSON.stringify({
                usuaId: request.usuaId,
                usuaCedula: request.usuaCedula,
                usuaNombre: request.usuaNombre,
                usuaUsername: request.usuaNombre,
                usuaCorreo: request.usuaCorreo,
                usuaContrasena: request.usuaContrasena,
                usuaTelefono: request.usuaTelefono,
                usuaDireccion: request.usuaDireccion,
                usuaPrimerInicio: request.usuaPrimerInicio,
                usuaPermId: request.usuaPermId,
                usuaPermNombre: request.usuaPermNombre
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
    }
}

export default new UsuarioService