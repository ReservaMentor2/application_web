import { Component, inject } from '@angular/core';
import {Router} from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  private router = inject(Router);

  logout(): void {
    this.router.navigate(['/'])
  }

}
