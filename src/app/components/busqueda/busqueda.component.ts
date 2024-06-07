import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../navbar/navbar.component';
import { MentorService } from '../../services/mentor.service';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, NgIf, NgForOf, FormsModule],
  providers: [HttpClientModule, CommonModule, BrowserModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  mentores: Mentor[] = [];
  filteredMentores: Mentor[] = [];
  filteredMentoresSlice: Mentor[] = [];
  categories: string[] = [];
  ratings: number[] = [5, 4, 3, 2, 1];
  selectedCategories: string[] = [];
  sortOption: string = '';
  searchTopic: string = '';
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedSessionTypes: string[] = [];
  selectedRatings: number[] = [];
  maxPrice: number = 0;

  // Estado para la paginación
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private mentorService: MentorService, private http: HttpClient) {
    this.mentorService = new MentorService(http);
    this.obtenerMentores();
    this.filterMentores();
    this.paginateMentores();
  }

  ngOnInit(): void {}

  obtenerMentores(): void {
    this.mentorService.getData().subscribe(
      (data: Mentor[]) => {
        this.mentores = data;
        this.filteredMentores = data;
        this.categories = Array.from(
          new Set(data.flatMap((mentor) => mentor.categorias))
        );
      },
      (error) => {
        console.error('Error al obtener mentores:', error);
      }
    );
  }
  onSearch(): void {
    this.currentPage = 1;
    this.filterMentores();
    this.paginateMentores();
  }

  filterMentores(): void {
    this.filteredMentores = this.mentores.filter((mentor) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.some((category) =>
          mentor.categorias.includes(category)
        );
      const normalizeString = (str: string): string => {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      };

      // Filtro por Tópico (Buscar tópico)
      const matchesTopic =
        !this.searchTopic ||
        mentor.categorias.some((category) =>
          normalizeString(category).includes(normalizeString(this.searchTopic))
        );
      const matchesDate = this.isWithinSelectedDateTimeRange(
        mentor.horariosDisponibles
      );
      const matchesSessionType =
        this.selectedSessionTypes.length === 0 ||
        this.selectedSessionTypes.some((type) =>
          mentor.tiposSesiones.includes(type)
        );
      const matchesRating =
        this.selectedRatings.length === 0 ||
        this.selectedRatings.some(
          (rating) => Math.round(mentor.calificacion) === rating
        );
      const matchesPrice =
        this.maxPrice === 0 || mentor.tarifaPorHora <= this.maxPrice;

      return (
        matchesCategory &&
        matchesTopic &&
        matchesDate &&
        matchesSessionType &&
        matchesRating &&
        matchesPrice
      );
    });

    this.sortMentores();
  }

  paginateMentores(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredMentores.length
    );

    if (this.filteredMentores.length > 0) {
      this.filteredMentoresSlice = this.filteredMentores.slice(
        startIndex,
        endIndex
      );
      this.totalPages = Math.ceil(this.filteredMentores.length / this.pageSize);
    } else {
      this.totalPages = 0;
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.paginateMentores();
  }

  isWithinSelectedDateTimeRange(
    horariosDisponibles: HorarioDisponible[]
  ): boolean {
    if (!this.startDate || !this.endDate || !this.startTime || !this.endTime) {
      return true;
    }

    const startDateTime = new Date(`${this.startDate}T${this.startTime}`);
    const endDateTime = new Date(`${this.endDate}T${this.endTime}`);

    return horariosDisponibles.some((horario) => {
      const horarioStart = new Date(`${horario.fecha}T${horario.inicio}`);
      const horarioEnd = new Date(`${horario.fecha}T${horario.fin}`);
      return (
        (horarioStart >= startDateTime && horarioStart <= endDateTime) ||
        (horarioEnd >= startDateTime && horarioEnd <= endDateTime) ||
        (horarioStart <= startDateTime && horarioEnd >= endDateTime)
      );
    });
  }

  isWithinSelectedDateRange(horariosDisponibles: HorarioDisponible[]): boolean {
    if (!this.startDate || !this.endDate) {
      return true;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    return horariosDisponibles.some((horario) => {
      const date = new Date(horario.fecha);
      return date >= start && date <= end;
    });
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat !== category
      );
    } else {
      this.selectedCategories.push(category);
    }
    this.filterMentores();
    this.changePage(1);
  }

  onMaxPriceChange(event: any): void {
    // Si el campo de entrada está vacío, establece maxPrice en 0, de lo contrario, usa el valor ingresado
    this.maxPrice = event.target.value ? parseFloat(event.target.value) : 0;
    this.filterMentores();
    this.changePage(1);
  }

  toggleSessionType(sessionType: string): void {
    if (this.selectedSessionTypes.includes(sessionType)) {
      this.selectedSessionTypes = this.selectedSessionTypes.filter(
        (st) => st !== sessionType
      );
    } else {
      this.selectedSessionTypes.push(sessionType);
    }
    this.filterMentores();
    this.changePage(1);
  }

  toggleRating(rating: number): void {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter((r) => r !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    this.filterMentores();
    this.changePage(1);
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
        this.filteredMentores.sort(
          (a, b) => a.estudiantesAyudados - b.estudiantesAyudados
        );
        break;
      case 'students-desc':
        this.filteredMentores.sort(
          (a, b) => b.estudiantesAyudados - a.estudiantesAyudados
        );
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
    this.paginateMentores();
  }
}
