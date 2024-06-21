import { Environment } from "@/environment/environment"
import { ResponseAPI } from "@/interfaces/ResponseApiInterface"
import { Tarea } from "@/interfaces/TareaInterface"

class TareaService {
    urlAPI = Environment.endpoint + "Tarea/"

    // Obtener la lista de tareas registradas
    async Lista(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Obtener la lista de tareas registradas asociadas a un usuario en especifico
    async ListaUsuario(Id: number): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}ListaUsuario/${Id}`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }

    // Guardar una tarea a la base de datos
    async Guardar(request: Tarea): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Guardar`, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        return response.json()
    }

    // Editar una tarea de la base de datos
    async Editar(request: Tarea): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Editar`, {
            method: 'PUT',
            body: JSON.stringify(request),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })

        return response.json()
    }

    // Eliminar una tarea registrada
    async Eliminar(Id: number): Promise<ResponseAPI> {
        const response = await fetch(`${this.urlAPI}Eliminar/${Id}`, {
            method: 'DELETE'
        })

        return response.json()
    }
}

export default new TareaService