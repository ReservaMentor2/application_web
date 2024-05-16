import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { NavBarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: 'landing-page', component: LandingPageComponent, title: 'ReservaMentor'},
    { path: 'navbar', component: NavBarComponent},
    { path: '**', redirectTo: '/busquedaMentores', pathMatch: 'full'}
];
