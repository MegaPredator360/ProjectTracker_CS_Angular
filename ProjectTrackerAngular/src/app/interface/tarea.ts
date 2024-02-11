import { TareaUsuario } from "./tarea-usuario";

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
    tareCantidadUsuario: number,
    tareaUsuarios: TareaUsuario[]
}