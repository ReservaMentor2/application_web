import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AuthRequest } from '../interfaces/auth.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }


  form: FormGroup = this.fb.group({
    firstName: [, [Validators.required]],
    lastName: [, [Validators.required]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(4)]],
  });
  passwordVisible = false;

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  signup() {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    console.log(formValue);
    this.router.navigate(['']);
  }

}
