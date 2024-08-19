import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    private urlApi: string = environment.endpoint + "Estado/";

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }
}