import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing_page/index.html', 
  styleUrl: './landing_page/css/styles.component.css'
})
export class LandingPageComponent {
  title = 'main-page'
}
