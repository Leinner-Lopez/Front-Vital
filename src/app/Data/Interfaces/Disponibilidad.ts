export interface DisponibilidadDTO{
    id?:number;
    numeroDocumentoMedico:number;
    inicioDisponibilidad:string;
    finDisponibilidad:string;
}

export interface DisponibilidadDtoHoras{
    inicio:string;
    fin:string;
}