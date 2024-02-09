import { Usuario } from "./usuario";

export interface Tarea
{
    tareId: number,
    tareNombre: string,
    tareDescripcion: string,
    tareFechaInicio: string,
    tareProyId: number,
    tareProyNombre: string,
    tareEstaId: number,
    tareEstaNombre: string,
    tareUsuario: Usuario[]
}