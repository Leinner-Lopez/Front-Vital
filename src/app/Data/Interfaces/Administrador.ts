export interface Administrador{
    numeroDocumento:number;
    nombres:string;
    apellidos:string;
    tipoDocumento:string;
    correo:string;
    telefono:string;
    barrio:string;
    contrasena:string;
}

export interface AdministradorDTO{
    numeroDocumento:number;
    nombres:string;
    apellidos:string;
    correo:string;
    telefono:string;
}