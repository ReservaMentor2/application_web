import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../navbar/navbar.component';
import { MentorService } from '../../services/mentor.service';
import { Mentor } from '../../models/mentor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports:  [NavBarComponent, NgIf, NgForOf],
  providers: [HttpClientModule, CommonModule, BrowserModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  mentores: Mentor[] = [];


  constructor(private mentorService: MentorService, private http: HttpClient) {
    mentorService = new MentorService(http)
    this.obtenerMentores();
  }


  ngOnInit(): void {
  }


  obtenerMentores(): void {
    this.mentorService.getData().subscribe(
      (data: Mentor[]) => {
        this.mentores = data;
      },
      (error) => {
        console.error('Error al obtener mentores:', error);
        // Manejar el error apropiadamente
      }
    );
  }
}
