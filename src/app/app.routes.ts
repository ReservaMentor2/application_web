import { Routes } from '@angular/router';

import { RealizarReservaComponent } from './components/realizar-reserva/realizar-reserva.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
  { path: 'navbar', component: NavBarComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'realizar-reserva/:index', component: RealizarReservaComponent },
  { path: 'realizarReserva', component: RealizarReservaComponent },
  { path: '**', redirectTo: '/busqueda', pathMatch: 'full' },
];
