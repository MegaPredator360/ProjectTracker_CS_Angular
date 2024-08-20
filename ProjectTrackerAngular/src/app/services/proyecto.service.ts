import { Injectable } from "@angular/core";
import { Proyecto } from "../interfaces/proyecto";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../interfaces/response-api";
import { environmentProd } from "../../environment/environment.prod";

@Injectable({
    providedIn: 'root'
})

export class ProyectoService {

    // Configurar si se esta trabajando en un ambiente de produccion o no
    private prod: Boolean = true

    // Se obtiene enlace
    private urlApi: string = this.prod == true ? environmentProd.endpoint + "Proyecto/" : environment.endpoint + "Proyecto/"

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }

    Guardar(request: Proyecto): Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)
    }

    Editar(request: Proyecto): Observable<ResponseApi> {
        return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
    }

    Eliminar(Id: number): Observable<ResponseApi> {
        return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${Id}`)
    }
}