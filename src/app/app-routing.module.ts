import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { authGuard } from './user/helpers/admin.guard';
import { RealizarReservaComponent } from './components/realizar-reserva/realizar-reserva.component';
import { DetallesMentoriaComponent } from './components/detalles-mentoria/detalles-mentoria.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RenovarContrasenaComponent } from './renovar-contrasena/renovar-contrasena.component';
import { PrivacidadComponent } from './components/privacidad/privacidad.component';
import { im } from 'mathjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'realizar-reserva/:mentorId', component: RealizarReservaComponent },
  { path: 'valoraciones/:mentorId', component: ValoracionesComponent },
  { path: 'notificaciones', component: ConfiguracionComponent },
  { path: 'detalles-mentoria', component: DetallesMentoriaComponent },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
  { path: 'terminos-y-condiciones', component: TerminosComponent},
  {path: 'politica-de-privacidad', component: PrivacidadComponent},
  { path: 'forgot/:token', component: RenovarContrasenaComponent },
  {
    path: 'counseling',
    loadChildren: () =>
      import('./counseling/counseling.module').then((m) => m.CounselingModule),
  },
  {
    path: 'download',
    loadChildren: () =>
      import('./downloads/downloads.module').then((m) => m.DownloadsModule),
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./mentor/mentor.module').then((m) => m.MentorModule),
  },
  {
    path: '',
    redirectTo: 'login', // Ruta predeterminada a login
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
