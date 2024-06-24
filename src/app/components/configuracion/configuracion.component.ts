import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserConfig {
  notificacionesMentorias: boolean;
  notificacionesValoraciones: boolean;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {
  userConfig: UserConfig = {
    notificacionesMentorias: false,
    notificacionesValoraciones: false
  };

  ngOnInit() {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    const savedConfig = localStorage.getItem('userConfig');
    if (savedConfig) {
      this.userConfig = JSON.parse(savedConfig);
    }
  }

  guardarConfiguracion() {
    localStorage.setItem('userConfig', JSON.stringify(this.userConfig));
    alert('Configuración guardada exitosamente');
  }
}