import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { NavBarComponent } from './components/navbar/navbar.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
    { path: 'landing-page', component: LandingPageComponent, title: 'ReservaMentor'},
    { path: 'navbar', component: NavBarComponent},
    { path: 'busqueda', component: BusquedaComponent},
    { path: '**', redirectTo: '/busqueda', pathMatch: 'full'}
];
