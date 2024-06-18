import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HeaderMentorLoggedComponent } from '../shared/header-mentor-logged/header-mentor-logged.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: '', component: HeaderMentorLoggedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CounselingRoutingModule {}
