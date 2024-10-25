import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    const headers = this.getHeaders();
    const requestBody = {
      correo: data.correo,
      contrasenia: data.contrasenia,
    };

    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, requestBody, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.log('Error completo:', error);
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            console.error('Error del cliente:', error.error.message);
            return throwError(
              () =>
                new Error(
                  'Ocurrió un error de conexión. Por favor, intenta de nuevo.'
                )
            );
          } else {
            // Error del lado del servidor
            console.error(
              `Código del backend: ${error.status}, ` +
                `Cuerpo del error: ${JSON.stringify(error.error)}`
            );
            return throwError(
              () =>
                new Error(
                  error.error?.message ||
                    'Error en el servidor. Por favor, intenta más tarde.'
                )
            );
          }
        })
      );
  }
}
