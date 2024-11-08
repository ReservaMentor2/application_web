import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenovarContrasenaService {
  private apiUrl = 'http://localhost:8080/api/v1/password/reset';  // URL de tu API para resetear contraseña

  constructor(private http: HttpClient) {}

  // Método para renovar la contraseña
  renovar(token: string, newPassword: string): Observable<any> {
    const body = {
      token: token,
      newPassword: newPassword
    };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
