import { Routes } from '@angular/router';

import { NavBarComponent } from './components/navbar/navbar.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
    { path: 'navbar', component: NavBarComponent},
    { path: 'busqueda', component: BusquedaComponent},
    { path: '**', redirectTo: '/busqueda', pathMatch: 'full'}
];
