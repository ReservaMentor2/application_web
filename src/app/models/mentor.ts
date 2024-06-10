// models/mentor.ts
export interface Mentor {
  id: number;
  nombre: string;
  fotoPerfil: string;
  descripcion: string;
  calificacion: number;
  tarifaPorHora: number;
  estudiantesAyudados: number;
  categorias: string[];
  horariosDisponibles: HorarioDisponible[];
  tiposSesiones: string[];
  resenias: Resenia[];
  desactivado: boolean;
}

export interface HorarioDisponible {
  fecha: string; // formato: "YYYY-MM-DD"
  inicio: string; // formato: "HH:mm"
  fin: string; // formato: "HH:mm"
}

export interface Resenia {
  estudiante: {
    id: number;
    nombre: string;
    fotoPerfil: string;
    calificacion: number;
  };
  calificacion: number;
  comentario: string;
  fecha: string;
}
