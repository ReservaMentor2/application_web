import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { HeaderComponent } from '../header/header.component';
import { InfoComponent } from '../info/info.component';
import { CounselingComponent } from '../counseling/counseling.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ProfileComponent,
    HeaderComponent,
    InfoComponent,
    CounselingComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
