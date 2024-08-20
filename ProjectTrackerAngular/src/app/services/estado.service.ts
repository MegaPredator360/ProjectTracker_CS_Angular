import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ResponseApi } from '../interfaces/response-api';
import { environmentProd } from '../../environment/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    // Configurar si se esta trabajando en un ambiente de produccion o no
    private prod: Boolean = true

    // Se obtiene enlace
    private urlApi: string = this.prod == true ? environmentProd.endpoint + "Estado/" : environment.endpoint + "Estado/"

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }
}