import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadPageComponent } from './download-page/download-page.component';
import { DownloadCardComponent } from './download-card/download-card.component';
import { DownloadsRoutingModule } from './downloads-routing.module';

@NgModule({
  declarations: [
    DownloadPageComponent,
    DownloadCardComponent,
  ],
  imports: [
    DownloadsRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class DownloadsModule { }
