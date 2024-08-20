import { Injectable } from "@angular/core";
import { Tarea } from "../interfaces/tarea";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../interfaces/response-api";
import { environmentProd } from "../../environment/environment.prod";

@Injectable({
    providedIn: 'root'
})

export class TareaService {

    // Configurar si se esta trabajando en un ambiente de produccion o no
    private prod: Boolean = true

    // Se obtiene enlace
    private urlApi: string = this.prod == true ? environmentProd.endpoint + "Tarea/" : environment.endpoint + "Tarea/"

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }

    ListaUsuario(Id: number): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}ListaUsuario/${Id}`)
    }

    Guardar(request: Tarea): Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)
    }

    Editar(request: Tarea): Observable<ResponseApi> {
        return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
    }

    Eliminar(Id: number): Observable<ResponseApi> {
        return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${Id}`)
    }
}