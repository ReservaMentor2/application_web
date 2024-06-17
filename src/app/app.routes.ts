import { Routes } from '@angular/router';

import { NavBarComponent } from './shared/navbar/navbar.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
  { path: 'navbar', component: NavBarComponent },
  { path: 'busqueda', component: BusquedaComponent },
  {
    path: '',
    loadChildren: () =>
      import('./counseling/counseling.module').then((m) => m.CounselingModule),
  },
];
