import { Component, OnInit } from '@angular/core';
import { Sesion } from '../../models/sesion';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as sesionesData from '../../../assets/sesiones-list.json';

@Component({
  selector: 'app-detalles-mentoria',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './detalles-mentoria.component.html',
  styleUrl: './detalles-mentoria.component.css',
})
export class DetallesMentoriaComponent implements OnInit {
  sesiones: Sesion[] = [];

  ngOnInit() {
    this.cargarSesiones();
  }

  cargarSesiones() {
    const sesionesGuardadas = localStorage.getItem('sesiones');
    if (sesionesGuardadas) {
      this.sesiones = JSON.parse(sesionesGuardadas);
    } else {
      this.sesiones = (sesionesData as any).default.sesiones;
      this.guardarSesiones();
    }
    console.dir(this.sesiones);
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
}
