import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isFooterVisible = false; // Estado para controlar la visibilidad de la barra inferior

  constructor(private authService: AuthService, private router: Router) {}

  // Detectar si el usuario ha hecho scroll
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isFooterVisible = scrollPosition > 200; // Mostrar la barra si el scroll es mayor a 200px
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['busqueda']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
