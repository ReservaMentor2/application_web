// models/mentor.ts
export interface Mentor {
  idMentor: number;
  nombre: string;
  apellido: string;
  tarifahora: number;
  biografia: string;
  valoracion: number;
  horariosDisponibles: HorarioDisponible[];
  imagePath: string;
}

export interface HorarioDisponible {
  dia: string;
  horainicio: string;
  horafin: string;
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

export interface Mentor {
  isFavorite?: boolean;
}
