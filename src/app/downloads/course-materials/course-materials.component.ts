import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CourseMaterial {
  name: string;
  type: string;
  size: string;
}

@Component({
  selector: 'app-course-materials',
  templateUrl: './course-materials.component.html',
  styleUrls: ['./course-materials.component.css']
})
export class CourseMaterialsComponent implements OnInit {
  materials: CourseMaterial[] = [];
  title: string = '';
  description: string = '';

  displayedColumns: string[] = ['name', 'type', 'size', 'actions'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.title = data['title'];
      this.description = data['description'];
      this.materials = data['materials'];
    });
  }
}
