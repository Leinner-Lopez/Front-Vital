export interface Medico {
    numeroDocumento: number;
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    correo: string;
    telefono: string;
    barrio: string;
    contrasena: string;
    especialidad:string;
}
export interface MedicoDTO{
    numeroDocumento:number;
    nombres:string;
    apellidos:string;
    correo:string;
    especialidad:string;
}