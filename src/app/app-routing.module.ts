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

    path: 'download',
    loadChildren: () =>
      import('./downloads/downloads.module').then((m) => m.DownloadsModule),

    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./mentor/mentor.module').then((m) => m.MentorModule),

  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    redirectTo: 'course',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'counseling',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
