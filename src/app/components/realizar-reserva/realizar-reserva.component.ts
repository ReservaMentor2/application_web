import { Component, Input } from '@angular/core';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.css',
})
export class RealizarReservaComponent {
  @Input() index!: number;
  mentores: Mentor[] = [];
  horarioSeleccionado: HorarioDisponible | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.mentores = (mentorData as any).default;
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    console.dir(this.mentores);
  }

  onHorarioChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const [fecha, inicio, fin] = target.value.split(' ');
    this.horarioSeleccionado = { fecha, inicio, fin };
    console.log(this.horarioSeleccionado); 
  }
}
