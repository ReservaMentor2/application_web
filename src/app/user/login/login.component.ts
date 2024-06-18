import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { AuthRequest } from './../interfaces/auth.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authRequest: AuthRequest = {};

  private email: string = "test@gmail.com";

  constructor(
    private router: Router
  ) { }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.authRequest);

    if (form.value.email == this.email && form.value.password == "123456") {
      this.router.navigate(['busqueda']);
    }
  }
}
