import { Component, Input, OnInit } from '@angular/core';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import * as sesionesData from '../../../assets/sesiones-list.json';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '../../models/sesion';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../user/services/auth.service'; // Importar AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.css',
})
export class RealizarReservaComponent implements OnInit {
  mentor!: Mentor;
  mentores: Mentor[] = [];
  horarioSeleccionado: string = '';
  sesiones: Sesion[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,

    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerMentores();
  }

  obtenerMentores(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<Mentor[]>('http://localhost:8080/api/v1/mentor', { headers })
      .subscribe(
        (response) => {
          this.mentores.push(...response);
          let mentorId = Number(this.route.snapshot.paramMap.get('mentorId'));
          this.mentor = this.mentores.find(
            (mentor) => mentor.idMentor === mentorId
          )!;
          this.cargarSesiones();
        },
        (error) => {
          console.error('Error al obtener los mentores:', error);
        }
      );
  }

  cargarSesiones() {
    const sesionesGuardadas = localStorage.getItem('sesiones');
    if (sesionesGuardadas) {
      this.sesiones = JSON.parse(sesionesGuardadas);
    } else {
      this.sesiones = (sesionesData as any).default.sesiones;
    }
  }

  reservarMentoria() {
    if (this.horarioSeleccionado) {
      const [fecha, inicio, fin] = this.horarioSeleccionado.split(' ');
      const nuevaSesion: Sesion = {
        sesion: `Sesión con ${this.mentor.nombre}`,
        mentor: this.mentor.nombre,
        dia: fecha,
        horario: `${inicio} - ${fin}`,
      };
      this.sesiones.push(nuevaSesion);
      localStorage.setItem('sesiones', JSON.stringify(this.sesiones));
      alert('La mentoría ha sido agendada exitosamente.');
      this.router.navigate(['/busqueda']);
    } else {
      alert('Por favor, selecciona un horario antes de reservar.');
    }
  }
}
