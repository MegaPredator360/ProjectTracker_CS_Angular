import { Environment } from "../environments/environment"
import { InicioSesion } from "../interfaces/InicioSesionInterface"
import { ResponseAPI } from "../interfaces/ResponseApiInterface"
import { Usuario } from "../interfaces/UsuarioInterface"

class UsuarioService {

    urlAPI = Environment.endpoint + "Usuario/"

    // Obtener la lista de Usuarios Registrados
    async Lista(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Validar el inicio de sesion
    async IniciarSesion(request: InicioSesion): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}IniciarSesion`, {
            method: 'POST',
            body: JSON.stringify({
                correo: request.correo,
                contrasena: request.contrasena
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        return response.json()
    }

    // Obtener un usuario especifico mediante el ID
    async ObtenerUsuario(Id: number): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Unico/${Id}`, {
            method: 'GET'
        })

        return response.json()
    }

    // Guardar un usuario a la base de datos
    async Guardar(request: Usuario): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Guardar`, {
            method: 'POST',
            body: JSON.stringify({
                usuaId: request.usuaId,
                usuaCedula: request.usuaCedula,
                usuaNombre: request.usuaNombre,
                usuaUsername: request.usuaUsername,
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

        return response.json()
    }

    // Editar un usuario de la base de datos
    async Editar(request: Usuario): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Editar`, {
            method: 'PUT',
            body: JSON.stringify({
                usuaId: request.usuaId,
                usuaCedula: request.usuaCedula,
                usuaNombre: request.usuaNombre,
                usuaUsername: request.usuaUsername,
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

        return response.json()
    }

    // Eliminar un usuario registrado
    async Eliminar(Id: number): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Eliminar/${Id}`, {
            method: 'DELETE'
        })

        return response.json()
    }

    // Cambiar la contraseña de un usuario al iniciar sesion
    async CambiarContraseña(request: Usuario): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}CambiarContrasena`, {
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

        return response.json()
    }
}

export default new UsuarioService