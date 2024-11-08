import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = ''; // Inicializar la propiedad

  constructor(private http: HttpClient, private router: Router) {} // Inyectar Router en el constructor

  ngOnInit(): void {
    this.getProfileImage();
  }

  getProfileImage(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHVkZW50QHN0cmluZy5jb20iLCJyb2xlIjoiUk9MRV9FU1RVRElBTlRFIiwiZXhwIjoxNzMzNjE1OTE0fQ.aCg3X3puzcD7eJO-eYbCURV6JiDSrS0Opf5MBxOkj9jPV5MQNekYCaLFhQbGdJhwsSMR0PFQ1jqKERNbdeyblg'
    });

    this.http.get('https://reservamentor-api-latest.onrender.com/api/v1/profile/image', 
      { headers, responseType: 'blob' }).subscribe(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.profileImageUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      });
  }

  showCounseling() {
    this.router.navigate(['/counseling']);
  }

  showCourse() {
    this.router.navigate(['/course']);
  }
}