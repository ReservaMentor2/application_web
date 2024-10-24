export interface LoginResponse {
  message: string;
  token: string; // Token de autenticación
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
