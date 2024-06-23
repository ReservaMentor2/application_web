import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadPageComponent } from './download-page/download-page.component';
import { CourseMaterialsComponent } from './course-materials/course-materials.component';

const routes: Routes = [
  {
    path: 'course-materials', component: CourseMaterialsComponent, data: {
      title: 'Materiales del Curso', description: 'Descarga todos los materiales de la sesion, incluyendo PDF, codigo, etc.', materials: [
        { name: 'Introduction to React', type: 'PDF', size: '2.3 MB' },
        { name: 'React Hooks Tutorial', type: 'MP4', size: '145 MB' },
        { name: 'React Project Starter', type: 'ZIP', size: '12 MB' },
        { name: 'React Best Practices', type: 'PDF', size: '4.1 MB' },
        { name: 'React Performance Optimization', type: 'MP4', size: '215 MB' }
      ]
    }
  },
  {
    path: 'course-exercises', component: CourseMaterialsComponent, data: {
      title: 'Ejercicios del Curso', description: 'Descarga todos los ejercicios de la sesion para practicar tus habilidades.', materials: [
        { name: 'React Exercise 1', type: 'PDF', size: '1.3 MB' },
        { name: 'React Exercise 2', type: 'PDF', size: '1.8 MB' }
      ]
    }
  },
  {
    path: 'course-resources', component: CourseMaterialsComponent, data: {
      title: 'Recursos del Curso', description: 'Descarga todos los recursos para aprender mas.', materials: [
        { name: 'React Resource 1', type: 'PDF', size: '3.3 MB' },
        { name: 'React Resource 2', type: 'PDF', size: '2.1 MB' }
      ]
    }
  },
  {
    path: 'course-guides', component: CourseMaterialsComponent, data: {
      title: 'Guias del Curso', description: 'Descargue todas las guías de la sesion para mejorar tu aprendizaje.', materials: [
        { name: 'React Guide 1', type: 'PDF', size: '4.3 MB' },
        { name: 'React Guide 2', type: 'PDF', size: '5.1 MB' }
      ]
    }
  },
  
  { path: '', component: DownloadPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadsRoutingModule {
}
