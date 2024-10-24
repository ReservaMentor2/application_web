export interface SignUpRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  nacionalidad:string;
  telefono: string;
  biografia?: string;
  tarifaHora?: number;
}