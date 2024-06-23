import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/assets/course.json');
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.getAllCourses().pipe(
      map((items) => items.find((item) => item.id === id))
    );
  }
}
