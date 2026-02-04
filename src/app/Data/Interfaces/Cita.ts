import { EstadoCita } from "../Enum/EstadoCita";

export interface CitaDTO {
    id?: number;
    fechaCita: string;
    estado: EstadoCita;
    documentoMedico: number;
    documentoPaciente: number;
    nombrePaciente: string;
    nombreMedico: string;
    especialidadMedico: string;
}