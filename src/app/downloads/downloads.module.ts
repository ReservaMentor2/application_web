import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadPageComponent } from './download-page/download-page.component';
import { DownloadCardComponent } from './download-card/download-card.component';
import { DownloadsRoutingModule } from './downloads-routing.module';
import { CourseMaterialsComponent } from './course-materials/course-materials.component';
import { MatTableModule } from '@angular/material/table';

interface CourseMaterial {
  name: string;
  type: string;
  size: string;
}

@NgModule({
  declarations: [
    DownloadPageComponent,
    DownloadCardComponent,
    CourseMaterialsComponent
  ],
  imports: [
    DownloadsRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    
  ],
})
export class DownloadsModule {
}
