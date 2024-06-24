import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MentorService } from '../../services/mentor.service';
import { Router } from '@angular/router';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { HttpClient } from '@angular/common/http';
import * as math from 'mathjs';
import { create, all } from 'mathjs';
import {
  faStar as solidStar,
  faStar as regularStar,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-busqueda',
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
  private math = create(all);

  solidStar = solidStar;
  regularStar = regularStar;

  // Estado para la paginacion
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  // Formulario Reactivo
  searchForm: FormGroup;

  constructor(
    private mentorService: MentorService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
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

  navigateToRoute(indexMentor: number) {
    this.router.navigate(['/realizar-reserva', indexMentor - 1]);
    console.log(indexMentor);
  }

  ngOnInit(): void {
    this.obtenerMentores();
    this.searchForm.valueChanges.subscribe(() => this.onSearch());
    this.filterMentores();
    this.paginateMentores();
  }

  navigateToValoraciones(mentorId: number) {
    this.router.navigate(['/valoraciones', mentorId-1]);
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
        console.log(this.filteredMentores);
      },
      (error) => {
        console.error('Error al obtener mentores:', error);
      }
    );
  }

  toggleFavorite(mentor: Mentor): void {
    mentor.isFavorite = !mentor.isFavorite;
    this.sortMentores(this.searchForm.value.sortOption);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterMentores();
    this.paginateMentores();
  }

  normalizeString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  // Crea el vector del query normalizando y tokenizando
  createQueryVector(query: string): number[] {
    const allTerms = this.getAllTerms();
    return allTerms.map(
      (term) =>
        this.termFrequency(term, query) * this.inverseDocumentFrequency(term)
    );
  }

  // Obtiene todos los términos únicos de los nombres y descripciones de los mentores
  getAllTerms(): string[] {
    const terms = new Set<string>();
    this.mentores.forEach((mentor) => {
      this.tokenize(mentor.nombre).forEach((term) => terms.add(term));
      this.tokenize(mentor.descripcion).forEach((term) => terms.add(term));
    });
    return Array.from(terms);
  }

  // Tokeniza el texto en un arreglo de palabras normalizadas
  tokenize(text: string): string[] {
    return this.normalizeString(text)
      .split(/\W+/)
      .filter((term) => term.length > 0);
  }

  // Calcula la frecuencia de un término en un texto
  termFrequency(term: string, text: string): number {
    const tokens = this.tokenize(this.normalizeString(text));
    const count = tokens.filter((t) => t === this.normalizeString(term)).length;
    return count / tokens.length;
  }

  // Calcula la frecuencia inversa de documentos
  inverseDocumentFrequency(term: string): number {
    const numDocumentsWithTerm = this.mentores.filter((mentor) =>
      this.tokenize(
        this.normalizeString(mentor.nombre) +
          ' ' +
          this.normalizeString(mentor.descripcion)
      ).includes(this.normalizeString(term))
    ).length;
    return 1 + Math.log(this.mentores.length / (numDocumentsWithTerm + 1));
  }

  // Calcula la similitud del coseno entre el query y el mentor
  calculateCosineSimilarity(queryVector: number[], mentor: Mentor): number {
    const docVector = this.createDocumentVector(mentor);
    const dotProduct = queryVector.reduce(
      (sum, qVal, i) => sum + qVal * docVector[i],
      0
    );
    const normQuery = Math.sqrt(
      queryVector.reduce((sum, qVal) => sum + qVal * qVal, 0)
    );
    const normDoc = Math.sqrt(
      docVector.reduce((sum, dVal) => sum + dVal * dVal, 0)
    );
    return dotProduct / (normQuery * normDoc);
  }

  // Crea el vector del mentor normalizando y tokenizando
  createDocumentVector(mentor: Mentor): number[] {
    const allTerms = this.getAllTerms();
    const combinedText = mentor.nombre + ' ' + mentor.descripcion;
    return allTerms.map(
      (term) =>
        this.termFrequency(term, this.normalizeString(combinedText)) *
        this.inverseDocumentFrequency(term)
    );
  }
  filterMentores(): void {
    const formValues = this.searchForm.value;
    if (!formValues.searchTopic) {
      this.filteredMentores = this.mentores;
    } else {
      const query = this.normalizeString(formValues.searchTopic).trim();
      const queryVector = this.createQueryVector(query);
      // console.log('Query Vector:', queryVector);

      this.filteredMentores = this.mentores
        .map((mentor) => {
          const similarity = this.calculateCosineSimilarity(
            queryVector,
            mentor
          );
          console.log(`Similitud con ${mentor.nombre}: ${similarity}`);
          return {
            mentor,
            similarity,
          };
        })
        .filter(({ similarity }) => similarity >= 0.1)
        .sort((a, b) => b.similarity - a.similarity)
        .map(({ mentor }) => mentor);
    }

    this.filterByAdditionalCriteria();
    this.sortMentores(formValues.sortOption);
    this.paginateMentores();
  }

  filterByAdditionalCriteria(): void {
    const formValues = this.searchForm.value;

    this.filteredMentores = this.filteredMentores.filter((mentor) => {
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
        matchesDate &&
        matchesSessionType &&
        matchesRating &&
        matchesPrice
      );
    });

    this.sortMentores(formValues.sortOption);
  }

  roundCalificacion(calificacion: number): number {
    return Math.round(calificacion);
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
    console.log('hola esto existe', this.filteredMentores);

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
      case 'students-fav':
        this.filteredMentores.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) {
            return -1;
          }
          if (!a.isFavorite && b.isFavorite) {
            return 1;
          }
          return 0;
        });
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
