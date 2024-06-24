import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as mentorData from '../../../assets/mentores-list.json';
import * as comentariosData from '../../../assets/comentarios-list.json';
import { Mentor } from '../../models/mentor';

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
  index!: number;
  mentor!: Mentor;
  comentarios: Comentario[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    this.cargarMentor();
    this.cargarComentarios();
  }

  cargarMentor() {
    const mentores = (mentorData as any).default;
    this.mentor = mentores[this.index];
  }

  cargarComentarios() {
    const todosComentarios: Comentario[] = (comentariosData as any).default;
    this.comentarios = todosComentarios.filter(
      (c) => c.mentorId === this.index
    );
  }
}
