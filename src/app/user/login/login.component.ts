import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Servicio de autenticación
import { LoginRequest } from '../interfaces/login-request.interface'; // Interfaz de solicitud de login
import { LoginResponse } from '../interfaces/login-response.interface'; // Interfaz de respuesta de login
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Definir los campos del formulario
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email debe ser válido
      password: ['', Validators.required], // Contraseña requerida
    });
  }

  ngOnInit(): void {}

  // Método de inicio de sesión
  login(): void {
    if (this.form.invalid) {
        return;
    }

    const credentials: LoginRequest = this.form.value;

    this.authService.login(credentials).subscribe({
        next: (response: LoginResponse) => {
            this.showSnackBar('Inicio de sesión exitoso');
            this.router.navigate(['/busqueda']); // Redirigir a la página de inicio
        },
        error: (error) => {
            console.error('Error en el inicio de sesión:', error);
            if (error.status === 401) {
                this.showSnackBar('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
            } else {
                this.showSnackBar('Error en el inicio de sesión. Por favor, intenta de nuevo.');
            }
        },
    });
  }

  // Método para validar si un control del formulario tiene errores
  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  // Método para mostrar el mensaje de notificación (SnackBar)
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
