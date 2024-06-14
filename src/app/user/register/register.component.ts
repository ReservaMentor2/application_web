import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { AuthRequest } from '../interfaces/auth.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  authRequest: AuthRequest = {};

  private email: string = "hmendo81@gmail.com";

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
