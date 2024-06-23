import { Component, Input } from '@angular/core';
import { Sesion } from '../../models/sesion';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as sesionesData from '../../../assets/sesiones-list.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-mentoria',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './detalles-mentoria.component.html',
  styleUrl: './detalles-mentoria.component.css',
})
export class DetallesMentoriaComponent {
  sesiones: Sesion[] = [];

  ngOnInit() {
    this.sesiones = (sesionesData as any).default.sesiones;
    console.dir(this.sesiones);
  }
}
