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
  selectedFile: File | null = null; // Propiedad para almacenar el archivo seleccionado

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {} // Inyectar AuthService

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
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get(
        'https://reservamentor-api-latest.onrender.com/api/v1/profile/image',
        { headers, responseType: 'blob' }
      )
      .subscribe(
        (response) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.profileImageUrl = reader.result as string;
          };
          reader.readAsDataURL(response);
        },
        (error) => {
          console.error('Error al obtener la imagen de perfil:', error);
          console.error('Detalles del error:', error.message);
          console.error('Cuerpo del error:', error.error);

          // Intentar leer el cuerpo del error como JSON
          if (
            error.error instanceof Blob &&
            error.error.type === 'application/json'
          ) {
            const reader = new FileReader();
            reader.onload = () => {
              const errorMessage = JSON.parse(reader.result as string);
              console.error('Mensaje de error del servidor:', errorMessage);
            };
            reader.readAsText(error.error);
          }
        }
      );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  updateProfilePicture(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http
      .put(
        'https://reservamentor-api-latest.onrender.com/api/v1/profile/image',
        formData,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Respuesta de actualización de imagen:', response);
          this.getProfileImage();
        },
        (error) => {
          console.error('Error al actualizar la imagen de perfil:', error);
          console.error('Detalles del error:', error.message);
          console.error('Cuerpo del error:', error.error);
        }
      );
  }

  showCounseling() {
    this.router.navigate(['/counseling']);
  }

  showCourse() {
    this.router.navigate(['/course']);
  }
}
