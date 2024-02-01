import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ResponseApi } from '../interface/response-api';

@Injectable({
    providedIn: 'root'
})
export class PermisoService {

    private urlApi: string = environment.endpoint + "Permiso/";

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }
}