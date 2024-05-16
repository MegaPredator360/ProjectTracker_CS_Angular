import { Environment } from "@/environment/environment"
import { ResponseAPI } from "@/interfaces/ResponseApiInterface"

class EstadoService {
    urlAPI = Environment.endpoint + "Estado/"

    // Obtener la lista de estados registrados
    async Lista(): Promise<ResponseAPI> {

        // Se realiza la solicitud a la API
        const response = await fetch(`${this.urlAPI}Lista`, {
            method: 'GET'
        })

        // Se retorna la respuesta de la API
        return response.json()
    }
}

export default new EstadoService