import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounselingRoutingModule } from './counseling-routing.module';
import { HeaderMentorLoggedComponent } from '../shared/header-mentor-logged/header-mentor-logged.component';
import { CounselingComponent } from './counseling.component';

@NgModule({
  declarations: [FormComponent, HeaderMentorLoggedComponent],
  imports: [
    CommonModule,
    CounselingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CounselingModule {}
