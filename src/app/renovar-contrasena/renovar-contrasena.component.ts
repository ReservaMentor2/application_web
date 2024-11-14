import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RenovarContrasenaService } from '../services/renovar-contrasena.service';

@Component({
  selector: 'app-renovar-contrasena',
  templateUrl: './renovar-contrasena.component.html',
  styleUrls: ['./renovar-contrasena.component.css']
})
export class RenovarContrasenaComponent implements OnInit {
  form: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private renovarContrasenaService: RenovarContrasenaService // Debería ser este nombre
  ) {
    // Inicializa el formulario
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    // Captura el token de la URL
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('Token capturado:', this.token);
  }

  // Valida que las contraseñas coincidan
  passwordsMatchValidator(form: FormGroup): null | { passwordMismatch: boolean } {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  // Maneja el envío del formulario
  onSubmit(): void {
    if (this.form.valid && this.token) {
      const newPassword = this.form.get('newPassword')?.value;
      this.renovarContrasenaService.renovar(this.token, newPassword).subscribe({
        next: () => {
          this.snackBar.open('Contraseña actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']); // Redirige al login después de cambiar la contraseña
        },
        error: (err: any) => { // Se agregó el tipo explícito para 'err'
          this.snackBar.open('Error al renovar la contraseña. Intenta nuevamente.', 'Cerrar', { duration: 3000 });
          console.error('Error:', err);
        }
      });
    } else {
      this.snackBar.open('Por favor, completa el formulario correctamente.', 'Cerrar', { duration: 3000 });
    }
  }
}
