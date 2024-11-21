import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpService } from '../services/sign-up.service';
import { SignUpRequest } from '../interfaces/signup-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;
  passwordVisible = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private signUpService: SignUpService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      nacionalidad: ['peruana'],
      telefono: ['956767345'],
      isMentor: [false],
      biografia: [''],
      tarifaHora: [null],
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.form.get('isMentor')?.valueChanges.subscribe(isMentor => {
      if (!isMentor) {
        this.form.patchValue({
          biografia: '',
          tarifaHora: null
        });
      }
    });
  }

  get isMentor() {
    return this.form.get('isMentor')?.value;
  }

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  signup() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const signUpData: SignUpRequest = {
      nombre: this.form.get('firstName')?.value,
      apellido: this.form.get('lastName')?.value,
      correo: this.form.get('email')?.value,
      contrasenia: this.form.get('password')?.value,
      nacionalidad: "peruana",
      telefono: '955345333',
      biografia: this.isMentor ? this.form.get('biografia')?.value : undefined,
      tarifaHora: this.isMentor ? this.form.get('tarifaHora')?.value : undefined
    };

    const request = this.isMentor ? 
      this.signUpService.signUpMentor(signUpData) : 
      this.signUpService.signUpEstudiante(signUpData);

    request.subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.showSnackBar('Registro exitoso');
        this.router.navigate(['/busqueda']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en el registro:', error);
        let errorMessage = 'Error en el registro. Por favor, intenta de nuevo.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 401) {
          errorMessage = 'No autorizado. Verifica tus credenciales.';
        } else if (error.status === 400) {
          errorMessage = 'Datos inválidos. Por favor, verifica la información.';
        }
        
        this.showSnackBar(errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}