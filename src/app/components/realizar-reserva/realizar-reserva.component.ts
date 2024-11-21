import { Component, Input, OnInit } from '@angular/core';
import { HorarioDisponible, Mentor } from '../../models/mentor';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import * as mentorData from '../../../assets/mentores-list.json';
import * as sesionesData from '../../../assets/sesiones-list.json';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '../../models/sesion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../user/services/auth.service';
import { environment } from '../../../environments/environment';
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
  mentor!: Mentor;
  mentores: Mentor[] = [];
  horarioSeleccionado: {
    dia: string;
    horainicio: string;
    horafin: string;
  } = { dia: '', horainicio: '', horafin: '' };

  cursoSeleccionado: string = '';
  sesiones: Sesion[] = [];
  private baseUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

    token = this.authService.getToken();

    headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

  ngOnInit() {
    this.mentores = (mentorData as any).default;
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    console.dir(this.mentores);
    this.obtenerMentores();
  }

  reservarMentoria() {
    const informacionmentoria = {
      idMentor: this.mentor.idMentor,
      tituloDelCurso: this.cursoSeleccionado,
      tituloDeSesionMentoria: this.cursoSeleccionado,
      horaInicio: this.horarioSeleccionado.horainicio,
      horaFin: this.horarioSeleccionado.horafin,
      dia: this.horarioSeleccionado.dia,
    };

    interface MentoriaResponse {
      id: number;
      dia: string;
      horainicio: string;
      horafinal: string;
      weblink: string;
    }


    console.log('Informacion de la mentoria:', informacionmentoria);
    this.http
      .post<MentoriaResponse>(`${this.baseUrl}/sesionMentoria/crear`, informacionmentoria, 
        {
        headers: this.headers,
      }
    )
      .subscribe(
        //Valido: Manda a la pagina de paypal.
        //Erroneo: Manda error.

        (response) => {
          console.log('Mentoria reservada:', response);
          this.realizarPurchaseID(response.id)
        },
        (error) => {
          console.log('Error al reservar la mentoria:', error);
        }
      );
  }

  realizarPurchaseID(SessionMentoriaId: number): void {
    const token = this.authService.getToken();
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log(headers);
    console.log(this.token);

    this.http
      .post<Number>(`${this.baseUrl}/checkout/createID/${SessionMentoriaId}`, 
        {
        headers,
      }
    )
        .subscribe(
        //Valido: Manda a la pagina de paypal.
        //Erroneo: Manda error.

        (response) => {
          console.log('PurchaseID Creado: ', response);

        },
        (error) => {
          console.log('Error al crear el PurchaseID:', error);
        }
      );
    }

  crearPurchase(PurchaseID: number): void {
    const params = { purchaseId: PurchaseID, returnUrl: `https://reservamentor.netlify.app/busqueda`, cancelUrl: `https://reservamentor.netlify.app/busqueda` };

    this.http
    .post(`${this.baseUrl}/checkout/create`, params, {
      headers: this.headers,
    })
    .subscribe(
      (response: any) => {
        console.log('Compra creada:', response);

        if (response && response.paypalLink) {
          console.log(response)

          //window.location.href = response.paypalUrl;
        } else {
          console.error('No se recibió un enlace de PayPal en la respuesta.');
        }
      },
      (error) => {
        console.error('Error al crear la compra en PayPal:', error);
      }
    );
  }

  obtenerMentores(): void {
    this.http.get<Mentor[]>(`${this.baseUrl}/mentor`, { headers: this.headers }).subscribe(
      (response) => {
        this.mentores.push(...response);
        let mentorId = Number(this.route.snapshot.paramMap.get('mentorId'));
        this.mentor = this.mentores.find(
          (mentor) => mentor.idMentor === mentorId
        )!;
      },
      (error) => {
        console.error('Error al obtener los mentores:', error);
      }
    );
  }
}
