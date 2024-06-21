import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { authGuard } from './user/helpers/admin.guard';
import { RealizarReservaComponent } from './components/realizar-reserva/realizar-reserva.component';

const routes: Routes = [
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'realizar-reserva/:index', component: RealizarReservaComponent },
  {
    path: 'counseling',
    loadChildren: () =>
      import('./counseling/counseling.module').then((m) => m.CounselingModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
