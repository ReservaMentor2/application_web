import { Routes } from '@angular/router';

import { NavBarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    { path: 'navbar', component: NavBarComponent},
    { path: '**', redirectTo: '/navbar', pathMatch: 'full'}
];
