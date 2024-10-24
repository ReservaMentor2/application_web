import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SignUpRequest } from '../interfaces/signup-request.interface';
import { SignUpResponse } from '../interfaces/signup-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  signUpEstudiante(data: SignUpRequest): Observable<SignUpResponse> {
    const headers = this.getHeaders();
    
    // Asegurarse de que los datos coincidan con lo que espera el backend
    const requestBody = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      contrasenia: data.contrasenia,
      nacionalidad: data.nacionalidad,
      telefono: data.telefono
    };

    return this.http.post<SignUpResponse>(
      `${this.baseUrl}/auth/register/estudiante`, 
      requestBody,
      { headers }
    ).pipe(
      catchError(error => {
        console.log('Error completo:', error);
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          console.error('Error del cliente:', error.error.message);
          return throwError(() => new Error('Ocurrió un error de conexión. Por favor, intenta de nuevo.'));
        } else {
          // Error del lado del servidor
          console.error(
            `Código del backend: ${error.status}, ` +
            `Cuerpo del error: ${JSON.stringify(error.error)}`
          );
          return throwError(() => new Error(error.error?.message || 'Error en el servidor. Por favor, intenta más tarde.'));
        }
      })
    );
  }

  signUpMentor(data: SignUpRequest): Observable<SignUpResponse> {
    const headers = this.getHeaders();
    
    // Asegurarse de que los datos coincidan con lo que espera el backend
    const requestBody = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      contrasenia: data.contrasenia,
      nacionalidad: data.nacionalidad,
      telefono:data.telefono,
      biografia: data.biografia,
      tarifaHora: data.tarifaHora
    };

    return this.http.post<SignUpResponse>(
      `${this.baseUrl}/auth/register/mentor`, 
      requestBody,
      { headers }
    ).pipe(
      catchError(error => {
        console.log('Error completo:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Error del cliente:', error.error.message);
          return throwError(() => new Error('Ocurrió un error de conexión. Por favor, intenta de nuevo.'));
        } else {
          console.error(
            `Código del backend: ${error.status}, ` +
            `Cuerpo del error: ${JSON.stringify(error.error)}`
          );
          return throwError(() => new Error(error.error?.message || 'Error en el servidor. Por favor, intenta más tarde.'));
        }
      })
    );
  }
}