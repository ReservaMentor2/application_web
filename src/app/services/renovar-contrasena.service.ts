import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenovarContrasenaService {
  private apiUrl = '${this.baseURL}/mail/reset/';
  constructor(private http: HttpClient) {}

  // Método para renovar la contraseña
  renovar(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${token}`, newPassword, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })  // O 'application/json' si prefieres ese formato
    });
  }
}