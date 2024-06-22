import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MentorRoutingModule } from './mentor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    MaterialModule,
    MentorRoutingModule,
  ],
})
export class MentorModule {}
