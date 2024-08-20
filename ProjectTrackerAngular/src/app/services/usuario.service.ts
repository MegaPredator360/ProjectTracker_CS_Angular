import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentProd } from '../../environment/environment.prod';
import { environment } from '../../environment/environment';
import { ResponseApi } from '../interfaces/response-api';
import { InicioSesion } from '../interfaces/inicio-sesion';
import { Usuario } from '../interfaces/usuario';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    // Configurar si se esta trabajando en un ambiente de produccion o no
    private prod: Boolean = true

    // Se obtiene enlace
    private urlApi: string = this.prod == true ? environmentProd.endpoint + "Usuario/" : environment.endpoint + "Usuario/"
    
    private datosUsuario!: Usuario;

    constructor(private http: HttpClient) { }

    Lista(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }

    iniciarSesion(request: InicioSesion): Observable<ResponseApi> {
        return this.http.post<ResponseApi>(`${this.urlApi}IniciarSesion`, request)
    }



    ObtenerUsuario(Id: number): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Unico/${Id}`)
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

    CambiarContraseña(request: Usuario): Observable<ResponseApi> {
        return this.http.put<ResponseApi>(`${this.urlApi}CambiarContrasena`, request)
    }
}