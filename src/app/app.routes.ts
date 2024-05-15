import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Iniciar Sesion ReservaMentor'},
    { path: '**', redirectTo: '/login', pathMatch: 'full'}
];
