import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../models/mentor';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  constructor(private http: HttpClient) { }

  getData(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>('/assets/mentores-list.json');
  }
}
