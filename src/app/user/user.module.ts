import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule
  ]
})

export class UserModule { }
