import { Environment } from "../environments/environment"
import { Proyecto } from "../interfaces/ProyectoInterface"
import { ResponseAPI } from "../interfaces/ResponseApiInterface"

class ProyectoService {
    urlAPI = Environment.endpoint + "Proyecto/"

    // Obtener la lista de proyectos registrados
    async Lista(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Guardar un proyecto a la base de datos
    async Guardar(request: Proyecto): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Guardar`, {
            method: 'POST',
            body: JSON.stringify({
                proyId: request.proyId,
                proyNombre: request.proyNombre,
                proyDescripcion: request.proyDescripcion,
                proyFechaInicio: request.proyFechaInicio,
                proyEstaId: request.proyEstaId,
                proyEstaNombre: request.proyEstaNombre,
                proyCantidadTarea: request.proyCantidadTarea
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        return response.json()
    }

    // Editar un proyecto de la base de datos
    async Editar(request: Proyecto): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Editar`, {
            method: 'PUT',
            body: JSON.stringify({
                proyId: request.proyId,
                proyNombre: request.proyNombre,
                proyDescripcion: request.proyDescripcion,
                proyFechaInicio: request.proyFechaInicio,
                proyEstaId: request.proyEstaId,
                proyEstaNombre: request.proyEstaNombre,
                proyCantidadTarea: request.proyCantidadTarea
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        return response.json()
    }

    // Eliminar un proyecto registrado
    async Eliminar(Id: number): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Eliminar/${Id}`, {
            method: 'DELETE'
        })

        return response.json()
    }
}

export default new ProyectoService