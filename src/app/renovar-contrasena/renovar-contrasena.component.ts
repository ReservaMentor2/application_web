import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RecuperarContrasenaService } from '../services/recuperar-contrasena.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-renovar-contrasena',
  templateUrl: './renovar-contrasena.component.html',
  styleUrls: ['./renovar-contrasena.component.css']
})
export class RenovarContrasenaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private recuperarContrasenaService: RecuperarContrasenaService
  ) {
 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Inicializamos el formulario en ngOnInit()
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup): null | { passwordMismatch: boolean } {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario válido:', this.form.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
