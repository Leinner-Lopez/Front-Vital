export interface CitaDTO {
    id?: number;
    fechaCita: string;
    estado: string;
    documentoMedico: number;
    documentoPaciente: number;
    nombrePaciente: string;
    nombreMedico: string;
    especialidadMedico: string;
}