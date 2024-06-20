import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MentorService } from '../../services/mentor.service';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { HttpClient, withFetch } from '@angular/common/http';

import * as mathjs from 'mathjs';
import { BrowserPlatformLocation } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector: 'app-busqueda',
  providers: [BrowserPlatformLocation, FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  mentores: Mentor[] = [];
  filteredMentores: Mentor[] = [];
  filteredMentoresSlice: Mentor[] = [];
  categories: string[] = [];
  filteredCategories: string[] = [];
  selectedCategories: string[] = [];
  searchCategory: string = '';
  ratings: number[] = [5, 4, 3, 2, 1];
  selectedRatings: number[] = [];
  sortOption: string = '';
  searchTopic: string = '';
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedSessionTypes: string[] = [];
  maxPrice: number = 0;

  // Estado para la paginacion
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  // Formulario Reactivo
  searchForm: FormGroup;

  constructor(
    private mentorService: MentorService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.mentorService = new MentorService(http);
    this.searchForm = this.fb.group({
      searchTopic: [''],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      searchCategory: [''],
      maxPrice: [0],
      sortOption: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerMentores();
    this.paginateMentores();
    this.searchForm.valueChanges.subscribe(() => this.onSearch());
  }

  obtenerMentores(): void {
    this.mentorService.getData().subscribe(
      (data: Mentor[]) => {
        this.mentores = data;
        this.filteredMentores = data;
        this.categories = Array.from(
          new Set(data.flatMap((mentor) => mentor.categorias))
        );
        console.log(this.mentores);
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
    const formValues = this.searchForm.value;
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
      console.log(normalizeString(formValues.searchTopic));
      const matchesTopic =
        !formValues.searchTopic ||
        mentor.categorias.some((category) =>
          normalizeString(category).includes(
            normalizeString(formValues.searchTopic)
          )
        );

      const matchesDate = this.isWithinSelectedDateTimeRange(
        mentor.horariosDisponibles,
        formValues.startDate,
        formValues.endDate,
        formValues.startTime,
        formValues.endTime
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
        !formValues.maxPrice || mentor.tarifaPorHora <= formValues.maxPrice;

      return (
        matchesCategory &&
        matchesTopic &&
        matchesDate &&
        matchesSessionType &&
        matchesRating &&
        matchesPrice
      );
    });

    this.sortMentores(formValues.sortOption);
  }
  roundCalificacion(calificacion: number): number {
    return mathjs.round(calificacion);
  }
  formatHorario(horario: {
    fecha: string;
    inicio: string;
    fin: string;
  }): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const fecha = new Date(horario.fecha).toLocaleDateString('es-ES', options);
    return `${fecha}, ${horario.inicio} - ${horario.fin}`;
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
    horariosDisponibles: HorarioDisponible[],
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ): boolean {
    if (!startDate || !endDate || !startTime || !endTime) {
      return true;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

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

  removeCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.filter(
      (cat) => cat !== category
    );
    this.filterMentores();
    this.paginateMentores();
  }

  filterCategories(): void {
    const normalizeString = (str: string): string =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    this.filteredCategories = this.categories.filter((category) =>
      normalizeString(category).includes(
        normalizeString(this.searchForm.value.searchCategory)
      )
    );
    this.filterMentores();
    this.paginateMentores();
  }

  onMaxPriceChange(event: any): void {
    // event: any parameter
    // Si el campo de entrada está vacío, establece maxPrice en 0, de lo contrario, usa el valor ingresado
    this.maxPrice = event.target.value ? parseFloat(event.target.value) : 0;
    this.filterMentores();
    this.changePage(1);
    this.paginateMentores();
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
    this.paginateMentores();
  }

  toggleRating(rating: number): void {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter((r) => r !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    this.filterMentores();
    this.changePage(1);
    this.paginateMentores();
  }

  isSelectedCategory(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  isSelectedSessionType(sessionType: string): boolean {
    return this.selectedSessionTypes.includes(sessionType);
  }

  isSelectedRating(rating: number): boolean {
    return this.selectedRatings.includes(rating);
  }

  sortMentores(sortOption: string): void {
    switch (sortOption) {
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
    this.sortMentores(this.sortOption);
    this.paginateMentores();
  }
}
