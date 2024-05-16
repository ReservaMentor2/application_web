
export class Mentor {
  id: number;
  nombre: string;
  fotoPerfil: string;
  descripcion: string;
  calificacion: number;
  tarifaPorHora: number;
  categorias: string[]; // Puede ser programacion, RPA, ingles, programacion competitiva, Frontend, Backend, etc
  horariosDisponibles: string[]; // Puede ser 'mañana', 'tarde' o 'noche'
  tiposSesiones: string[]; // Puede ser 'grupal' o 'individual'
  resenias: Resenia[]; // Reseñas o comentarios de estudiantes
  desactivado: boolean; // Indica si el mentor está desactivado temporalmente

  constructor(
    id: number,
    nombre: string,
    fotoPerfil: string,
    descripcion: string,
    calificacion: number,
    tarifaPorHora: number,
    categorias: string[],
    horariosDisponibles: string[],
    tiposSesiones: string[],
    resenias: Resenia[],
    desactivado: boolean,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fotoPerfil = fotoPerfil;
    this.descripcion = descripcion;
    this.calificacion = calificacion;
    this.tarifaPorHora = tarifaPorHora;
    this.categorias = categorias;
    this.horariosDisponibles = horariosDisponibles;
    this.tiposSesiones = tiposSesiones;
    this.resenias = resenias;
    this.desactivado = desactivado;
  }
}

export class Resenia {
  estudiante: Estudiante; // Estudiante que dejó la reseña
  calificacion: number; // Calificación otorgada por el estudiante
  comentario: string; // Comentario o reseña del estudiante
  fecha: Date; // Fecha en la que se dejó la reseña

  constructor(
    estudiante: Estudiante,
    calificacion: number,
    comentario: string,
    fecha: Date
  ) {
    this.estudiante = estudiante;
    this.calificacion = calificacion;
    this.comentario = comentario;
    this.fecha = fecha;
  }
}

export class Estudiante {
  id: number;
  nombre: string;
  fotoPerfil: string;
  calificacion: number;

  constructor(
    id: number,
    nombre: string,
    fotoPerfil: string,
    calificacion: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fotoPerfil = fotoPerfil;
    this.calificacion = calificacion;
  }
}



