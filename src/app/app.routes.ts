import { Routes } from '@angular/router';

import { NavBarComponent } from './components/navbar/navbar.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Iniciar Sesion ReservaMentor'},
    { path: '**', redirectTo: '/login', pathMatch: 'full'}
    { path: 'navbar', component: NavBarComponent},
    { path: 'busqueda', component: BusquedaComponent},
    { path: '**', redirectTo: '/busqueda', pathMatch: 'full'}
];
