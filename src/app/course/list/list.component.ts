import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course.interface';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly service = inject(CourseService);

  items: Course[] = [];

  ngOnInit(): void {
    this.service.getAllCourses().subscribe((res) => {
      this.items = res;
    });
  }
  send(item: Course) {
    console.log(item);
    this.router.navigate(['/course/detail/', item.id]);
  }
}
