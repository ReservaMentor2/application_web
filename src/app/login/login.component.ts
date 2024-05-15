import { Component } from '@angular/core';

import { HeaderAdComponent } from '../header-ad/header-ad.component';
import { HeaderNotLoggedInComponent } from '../header-not-logged-in/header-not-logged-in.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderAdComponent, HeaderNotLoggedInComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
