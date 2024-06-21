import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [CommonModule, RouterModule, CourseRoutingModule],
})
export class CourseModule {}
