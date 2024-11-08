import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RecuperarContrasenaService } from '../services/recuperar-contrasena.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
})
export class RecuperarContrasenaComponent implements OnInit {
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

  ngOnInit(): void {}

  recuperarContrasena(): void {
    if (this.form.invalid) {
      return;  // Si el formulario es inválido, no hace nada
    }

    const email = this.form.value.email;

    // Llamada al servicio para recuperar la contraseña
    this.recuperarContrasenaService.recuperar(email).subscribe({
      next: (response: any) => {
        this.showSnackBar('Te hemos enviado un enlace para recuperar tu contraseña');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.showSnackBar('Error al enviar el enlace de recuperación. Intenta de nuevo.');
      },
    });
  }

  // Verifica si el control tiene un error de validación
  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  // Método para mostrar notificaciones con Snackbar
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

