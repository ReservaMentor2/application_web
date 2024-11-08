import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecuperarContrasenaService {
  private apiUrl = 'http://localhost:8080/api/v1/mail/sendMail'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para recuperar la contraseña
  recuperar(email: string): Observable<any> {
    // Enviar solo el valor del email como string, sin el envoltorio JSON
    return this.http.post<any>(this.apiUrl, email, {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),  // Aquí especificamos que se enviará texto plano
    });
  }
}
