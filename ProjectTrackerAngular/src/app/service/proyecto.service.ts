import { Injectable } from "@angular/core";
import { Proyecto } from "../interface/proyecto";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseApi } from "../interface/response-api";

@Injectable({
    providedIn: 'root'
})

export class ProyectoService
{
    private datosProyecto!: Proyecto;
    private urlApi: string = environment.endpoint + "Proyecto/";

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

    setDatosProyecto(proyecto: Proyecto) {
        this.datosProyecto = proyecto;
    }

    getDatosProyecto(): Proyecto {
        return this.datosProyecto;
    }
}