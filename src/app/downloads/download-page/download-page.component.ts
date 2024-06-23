import { Component } from '@angular/core';

interface CourseMaterial {
  name: string;
  type: string;
  size: string;
}

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrl: './download-page.component.css'
})
export class DownloadPageComponent {
}
