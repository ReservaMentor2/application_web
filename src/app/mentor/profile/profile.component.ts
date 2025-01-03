import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../user/services/auth.service'; // Importar AuthService
import { PerfilUsuarioDTO } from '../../models/usuario'; // Importar PerfilUsuarioDTO
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = ''; // Inicializar la propiedad
  selectedFile: File | null = null; // Propiedad para almacenar el archivo seleccionado
  perfilUsuario: PerfilUsuarioDTO | null = null;
  private baseUrl = environment.apiUrl;
  showScheduleForm: boolean = false;
  day: string = '';
  startTime: string = '';
  endTime: string = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {} // Inyectar AuthService

  ngOnInit(): void {
    this.getProfileImage();
    this.getProfile();
    this.toggleScheduleForm();
  }
  toggleScheduleForm(): void {
    this.showScheduleForm = !this.showScheduleForm;
  }

  saveSchedule(): void {
    if (!this.day) {
      console.error('No se ha seleccionado una fecha');
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const scheduleData = {
      dia: this.day,
      horainicio: this.startTime + ':00',
      horafin: this.endTime + ':00',
    };

    console.log('Datos del horario:', scheduleData);

    this.http
      .post(`${this.baseUrl}/disponibilidad`, scheduleData, { headers })
      .subscribe({
        next: (response) => {
          console.log('Horario guardado:', response);
        },
        error: (err) => {
          console.error('Error al guardar el horario:', err);
          console.error('Detalles del error:', err.message);
          console.error('Cuerpo del error:', err.error);
        },
      });
  }

  getProfile(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<PerfilUsuarioDTO>(`${this.baseUrl}/profile/`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          console.log('Perfil del usuario:', response);
          this.perfilUsuario = response;
        },
        error: (err) => {
          console.error('Error al obtener el perfil:', err);
          if (err.status === 404) {
            console.error('Perfil no encontrado');
          }
        },
      });
  }

  getProfileImage(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get(`${this.baseUrl}/profile/image`, { headers, responseType: 'blob' })
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
      .put(`${this.baseUrl}/profile/image`, formData, { headers })
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
