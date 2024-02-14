import { Injectable } from "@angular/core";
import { Tarea } from "../interface/tarea";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../interface/response-api";

@Injectable({
    providedIn: 'root'
})

export class TareaService
{
    private datosTarea!: Tarea;
    private urlApi: string = environment.endpoint + "Tarea/";

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

    setDatosTarea(tarea: Tarea) {
        this.datosTarea = tarea;
    }

    getDatosTarea(): Tarea {
        return this.datosTarea;
    }
}