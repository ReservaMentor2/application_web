import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CourseService);

  id = 0;

  item: Course | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.id = Number(params['id']);
    });
  }

  ngOnInit(): void {
    this.service.getCourseById(this.id).subscribe((res) => {
      console.log(res);
      this.item = res!;
    });
  }
}
