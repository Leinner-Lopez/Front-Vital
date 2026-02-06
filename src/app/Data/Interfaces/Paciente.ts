import { EstadoUsuario } from "../Enum/EstadoUsuario";

export interface Paciente {
    numeroDocumento: number;
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    correo: string;
    telefono: string;
    barrio: string;
    contrasena: string;
    seguroMedico: string;
    estado: string;
}
export interface PacienteDTO {
    numeroDocumento: number;
    nombres: string;
    apellidos: string;
    correo: string;
    seguroMedico: string;
    estado: string;
}