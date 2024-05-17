export interface Mentor {
  id: number;
  nombre: string;
  fotoPerfil: string;
  descripcion: string;
  calificacion: number;
  tarifaPorHora: number;
  estudiantesAyudados: number;
  categorias: string[];
  horariosDisponibles: string[];
  tiposSesiones: string[];
  resenias: Resenia[];
  desactivado: boolean;
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
