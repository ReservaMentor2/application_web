import { Routes } from '@angular/router';

import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
  { path: 'busqueda', component: BusquedaComponent },
  {
    path: '**',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
