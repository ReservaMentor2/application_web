import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgIf, NgForOf],
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.css',
})
export class RealizarReservaComponent {
  @Input() index!: number;
  mentores: Mentor[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.mentores = (mentorData as any).default;
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    console.dir(this.mentores);
  }
}
