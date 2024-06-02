import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
//import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'header', component: HeaderComponent },
  { path: '', redirectTo: 'header', pathMatch: 'full' },
];
