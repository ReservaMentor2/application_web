import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';
import { CounselingComponent } from './counseling/counseling.component';
import { UserComponent } from './user/user.component';
//import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'info', component: InfoComponent },
  { path: 'counseling', component: CounselingComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];
