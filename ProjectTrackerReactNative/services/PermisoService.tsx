import { Environment } from "@/environment/environment"
import { ResponseAPI } from "@/interfaces/ResponseApiInterface"

class PermisoService {
    urlAPI = Environment.endpoint + "Permiso/"

    // Obtener la lista de Permisos Registrados
    async Lista(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }
}

export default new PermisoService