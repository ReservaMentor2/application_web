import { Component, Input, OnInit } from '@angular/core';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import * as sesionesData from '../../../assets/sesiones-list.json';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '../../models/sesion';
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
  mentores: Mentor[] = [];
  horarioSeleccionado: string = '';
  sesiones: Sesion[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.mentores = (mentorData as any).default;
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    console.dir(this.mentores);
    this.cargarSesiones();
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
        sesion: `Sesión con ${this.mentores[this.index].nombre}`,
        mentor: this.mentores[this.index].nombre,
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
