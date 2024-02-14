import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ResponseApi } from '../interface/response-api';
import { InicioSesion } from '../interface/inicio-sesion';
import { Usuario } from '../interface/usuario';
import { ResponseAuth } from '../interface/response-auth';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private datosUsuario!: Usuario;
    private urlApi: string = environment.endpoint + "Usuario/";

    constructor(private http: HttpClient) { }

    iniciarSesion(request: InicioSesion): Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}IniciarSesion`, request)
    }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }

    Guardar(request: Usuario): Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)
    }

    Editar(request: Usuario): Observable<ResponseApi> {
        return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
    }

    Eliminar(Id: number): Observable<ResponseApi> {
        return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${Id}`)
    }

    setDatosUsuario(usuario: Usuario) {
        this.datosUsuario = usuario;
    }

    getDatosUsuario(): Usuario {
        return this.datosUsuario;
    }
}