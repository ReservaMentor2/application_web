import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../navbar/navbar.component';
import { MentorService } from '../../services/mentor.service';
import { Mentor } from '../../models/mentor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [NavBarComponent,FooterComponent, NgIf, NgForOf, FormsModule],
  providers: [HttpClientModule, CommonModule, BrowserModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  mentores: Mentor[] = [];
  filteredMentores: Mentor[] = [];
  categories: string[] = [];
  selectedCategories: string[] = [];
  sortOption: string = '';
  searchTopic: string = '';
  searchDate: string = '';
  selectedSessionTypes: string[] = [];
  selectedRatings: number[] = [];
  maxPrice: number = 0;
  selectedHorarios: string[] = [];

  constructor(private mentorService: MentorService, private http: HttpClient) {
    this.mentorService = new MentorService(http);
    this.obtenerMentores();
  }

  ngOnInit(): void {}

  obtenerMentores(): void {
    this.mentorService.getData().subscribe(
      (data: Mentor[]) => {
        this.mentores = data;
        this.filteredMentores = data;
        this.categories = Array.from(new Set(data.flatMap(mentor => mentor.categorias)));
      },
      (error) => {
        console.error('Error al obtener mentores:', error);
      }
    );
  }

  filterMentores(): void {
    this.filteredMentores = this.mentores.filter(mentor => {
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.some(category => mentor.categorias.includes(category));
      const matchesTopic = !this.searchTopic || mentor.categorias.includes(this.searchTopic);
      const matchesDate = !this.searchDate || mentor.horariosDisponibles.includes(this.getDayPeriod(this.searchDate));
      const matchesSessionType = this.selectedSessionTypes.length === 0 || this.selectedSessionTypes.some(type => mentor.tiposSesiones.includes(type));
      const matchesRating = this.selectedRatings.length === 0 || this.selectedRatings.includes(Math.round(mentor.calificacion));
      const matchesPrice = this.maxPrice === 0 || mentor.tarifaPorHora <= this.maxPrice;
      const matchesHorario = this.selectedHorarios.length === 0 || this.selectedHorarios.some(horario => mentor.horariosDisponibles.includes(horario));

      return matchesCategory && matchesTopic && matchesDate && matchesSessionType && matchesRating && matchesPrice && matchesHorario;
    });

    this.sortMentores();
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.filterMentores();
  }

  onMaxPriceChange(event: any): void {
    // Si el campo de entrada está vacío, establece maxPrice en 0, de lo contrario, usa el valor ingresado
    this.maxPrice = event.target.value ? parseFloat(event.target.value) : 0;
    this.filterMentores(); // Asegúrate de que el filtro se actualice con el nuevo valor de maxPrice
  }


  toggleSessionType(sessionType: string): void {
    if (this.selectedSessionTypes.includes(sessionType)) {
      this.selectedSessionTypes = this.selectedSessionTypes.filter(st => st !== sessionType);
    } else {
      this.selectedSessionTypes.push(sessionType);
    }
    this.filterMentores();
  }

  toggleRating(rating: number): void {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    this.filterMentores();
  }

  toggleHorario(horario: string): void {
    if (this.selectedHorarios.includes(horario)) {
      this.selectedHorarios = this.selectedHorarios.filter(h => h !== horario);
    } else {
      this.selectedHorarios.push(horario);
    }
    this.filterMentores();
  }

  sortMentores(): void {
    switch (this.sortOption) {
      case 'rating-asc':
        this.filteredMentores.sort((a, b) => a.calificacion - b.calificacion);
        break;
      case 'rating-desc':
        this.filteredMentores.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'students-asc':
        this.filteredMentores.sort((a, b) => a.estudiantesAyudados - b.estudiantesAyudados);
        break;
      case 'students-desc':
        this.filteredMentores.sort((a, b) => b.estudiantesAyudados - a.estudiantesAyudados);
        break;
      case 'price-asc':
        this.filteredMentores.sort((a, b) => a.tarifaPorHora - b.tarifaPorHora);
        break;
      case 'price-desc':
        this.filteredMentores.sort((a, b) => b.tarifaPorHora - a.tarifaPorHora);
        break;
      default:
        break;
    }
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.sortMentores();
  }

  onSearch(): void {
    this.filterMentores();
  }

  getDayPeriod(date: string): string {
    const day = new Date(date).getDay();
    switch (day) {
      case 0: return 'mañana'; // Sunday
      case 1: return 'mañana'; // Monday
      case 2: return 'tarde';  // Tuesday
      case 3: return 'tarde';  // Wednesday
      case 4: return 'noche';  // Thursday
      case 5: return 'noche';  // Friday
      case 6: return 'mañana'; // Saturday
      default: return '';
    }
  }
}
