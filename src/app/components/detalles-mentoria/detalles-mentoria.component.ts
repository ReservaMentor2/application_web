import { Component, OnInit } from '@angular/core';
import { Sesion } from '../../models/sesion';
import { Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as sesionesData from '../../../assets/sesiones-list.json';
import * as mentorData from '../../../assets/mentores-list.json';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalles-mentoria',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './detalles-mentoria.component.html',
  styleUrl: './detalles-mentoria.component.css',
})
export class DetallesMentoriaComponent implements OnInit {
  sesiones: Sesion[] = [];
  mentores: Mentor[] = [];
  sesionAReprogramar: number | null = null;
  horarioSeleccionado: string = '';

  ngOnInit() {
    this.cargarSesiones();
    this.cargarMentores();
  }

  cargarSesiones() {
    const sesionesGuardadas = localStorage.getItem('sesiones');
    if (sesionesGuardadas) {
      this.sesiones = JSON.parse(sesionesGuardadas);
    } else {
      this.sesiones = (sesionesData as any).default.sesiones;
      this.guardarSesiones();
    }
  }

  cargarMentores() {
    this.mentores = (mentorData as any).default;
  }

  guardarSesiones() {
    localStorage.setItem('sesiones', JSON.stringify(this.sesiones));
  }

  confirmarEliminacion(index: number): void {
    const confirmacion = window.confirm(
      '¿Estás seguro de que quieres cancelar esta sesión?'
    );
    if (confirmacion) {
      this.sesiones.splice(index, 1);
      this.guardarSesiones();
    }
  }

  iniciarReprogramacion(index: number): void {
    this.sesionAReprogramar = index;
    this.horarioSeleccionado = '';
  }

  confirmarReprogramacion(): void {
    if (this.sesionAReprogramar !== null && this.horarioSeleccionado) {
      const [fecha, inicio, fin] = this.horarioSeleccionado.split(' ');
      this.sesiones[this.sesionAReprogramar].dia = fecha;
      this.sesiones[this.sesionAReprogramar].horario = `${inicio} - ${fin}`;
      this.guardarSesiones();
      this.sesionAReprogramar = null;
      this.horarioSeleccionado = '';
      alert('La sesión ha sido reprogramada exitosamente.');
    } else {
      alert('Por favor, selecciona un nuevo horario válido.');
    }
  }

  cancelarReprogramacion(): void {
    this.sesionAReprogramar = null;
    this.horarioSeleccionado = '';
  }

  obtenerHorariosDisponibles(mentorNombre: string): any[] {
    const mentor = this.mentores.find((m) => m.nombre === mentorNombre);
    return mentor ? mentor.horariosDisponibles : [];
  }
}
