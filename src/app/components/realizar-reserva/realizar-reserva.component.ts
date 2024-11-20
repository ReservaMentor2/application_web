import { Component, Input, OnInit } from '@angular/core';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import * as sesionesData from '../../../assets/sesiones-list.json';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '../../models/sesion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../user/services/auth.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../user/services/auth.service'; // Importar AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.css',
})
export class RealizarReservaComponent implements OnInit {
  @Input() index!: number;
  mentor!: Mentor;
  mentores: Mentor[] = [];
  horarioSeleccionado: string = '';
  sesiones: Sesion[] = [];
  private baseUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.mentores = (mentorData as any).default;
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    console.dir(this.mentores);
    this.cargarSesiones();
    this.obtenerMentores();
  }

  reservarMentoria() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    //const informacionmentoria = {
    //  idMentor = this.mentor.idMentor,
    //  titulodelCurso = null,
    //  horaInicio = null,
    //  horaFin = null,
    //  dia = null
    //};

    this.http
      .post(`${this.baseUrl}/sesionMentoria/crear`, { headers })
      .subscribe(
        (response) => {
          console.log('Mentoria reservada:', response);
        },
        (error) => {
          console.log('Error al reservar la mentoria:', error);
        }
      );
  }

  obtenerMentores(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.get<Mentor[]>(`${this.baseUrl}/mentor`, { headers }).subscribe(
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
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerMentores();
  }


  reservarMentoria(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const mentorId = this.mentor.idMentor;
    this.http.get('${this.baseUrl}/mentor/${mentorId}/reservar', { headers }).subscribe(
      
    )
  }

  obtenerMentores(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<Mentor[]>(`${this.baseUrl}/mentor`, { headers })
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
}
