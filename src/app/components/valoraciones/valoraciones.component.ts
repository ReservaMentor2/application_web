import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as mentorData from '../../../assets/mentores-list.json';
import * as comentariosData from '../../../assets/comentarios-list.json';
import { Mentor } from '../../models/mentor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../user/services/auth.service'; // Importar AuthService

interface Comentario {
  nombre: string;
  comentario: string;
  estrellas: number;
  mentorId: number;
}

@Component({
  selector: 'app-valoraciones',
  standalone: true,
  imports: [NgIf, NgForOf, CommonModule],
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css'],
})
export class ValoracionesComponent implements OnInit {
  mentor!: Mentor;
  mentores: Mentor[] = [];
  index!: number;
  comentarios: Comentario[] = [];
  dejarComentario = false;
  private baseUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerMentores();
  }


  submitComentario(){
    
  }

  toggleComentario() {
    this.dejarComentario = !this.dejarComentario;
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
        this.cargarComentarios();
      },
      (error) => {
        console.error('Error al obtener los mentores:', error);
      }
    );
  }

  cargarComentarios() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<Comentario[]>(
        `${this.baseUrl}/reviews/comments/${this.mentor.idMentor}`,
        { headers }
      )
      .subscribe(
        (response) => {
          this.comentarios.push(...response);
          console.log(this.comentarios);
        },
        (error) => {
          console.error('Error al obtener los comentarios:', error);
        }
      );
  }

}
