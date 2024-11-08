import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../user/services/auth.service'; // Importar AuthService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = ''; // Inicializar la propiedad

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {} // Inyectar AuthService

  ngOnInit(): void {
    this.getProfileImage();
  }

  getProfileImage(): void {
    const token = this.authService.getToken(); // Obtener el token de AuthService
    console.log('Token:', token);
    if (!token) {
      console.error('No token found');
      return;
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('https://reservamentor-api-latest.onrender.com/api/v1/profile/image', 
      { headers, responseType: 'blob' }).subscribe(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.profileImageUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      }, error => {
        console.error('Error al obtener la imagen de perfil:', error);
        console.error('Detalles del error:', error.message);
        console.error('Cuerpo del error:', error.error);
      });
  }

  showCounseling() {
    this.router.navigate(['/counseling']);
  }

  showCourse() {
    this.router.navigate(['/course']);
  }
}