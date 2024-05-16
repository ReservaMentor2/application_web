import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../models/mentor'; // Mentor Model


@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private http:HttpClient) { }

  getJsonData(): Observable<{[key:string]:Mentor}> {
    return this.http.get<{[key:string]:Mentor}>('assets/mentores-list.json');
  }
}
