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
  horarioSeleccionado: {
    dia: string;
    horainicio: string;
    horafin: string;
  } = { dia: '', horainicio: '', horafin: '' };

  cursoSeleccionado: string = '';
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
    this.obtenerMentores();
  }

  reservarMentoria() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const informacionmentoria = {
      idMentor: this.mentor.idMentor,
      tituloDelCurso: this.cursoSeleccionado,
      tituloDeSesionMentoria: this.cursoSeleccionado,
      horaInicio: this.horarioSeleccionado.horainicio,
      horaFin: this.horarioSeleccionado.horafin,
      dia: this.horarioSeleccionado.dia,
    };

    console.log('Informacion de la mentoria:', informacionmentoria);
    this.http
      .post(`${this.baseUrl}/sesionMentoria/crear`, informacionmentoria, {
        headers,
      })
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
      },
      (error) => {
        console.error('Error al obtener los mentores:', error);
      }
    );
  }
}
