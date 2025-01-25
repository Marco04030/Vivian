import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProcessTextService } from '../../services/process-text.service';

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule], // Incluye CommonModule y FormsModule
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
})
export class WriteComponent {
  inputText = ''; // Texto que el usuario ingresa
  result = ''; // Resultado devuelto por el backend

  constructor(private apiService: ApiService) {}

  errorMessage = ''; // Variable para almacenar errores
  sendText() {
    this.errorMessage = '';
    // Elimina espacios adicionales
    this.inputText = this.inputText.trim().replace(/\s+/g, ' ');

  // Validar si el texto está vacío
  if (!this.inputText) {
    alert('Por favor, escribe algún texto antes de enviar.');
    return;
  }

  // Validar tamaño mínimo y máximo
  if (this.inputText.length < 1) {
    alert('El texto debe contener al menos un carácter.');
    return;
  }

  if (this.inputText.length > 200) { // Ajusta el límite máximo según necesidades
    alert('El texto no puede contener más de 200 caracteres.');
    return;
  }

  // Validar caracteres permitidos (letras, espacios y signos comunes)
  const regex = /^[A-Za-zÑñ0-9.,!?¿¡:;()\s]+$/;
  if (!regex.test(this.inputText)) {
    alert('El texto solo puede contener letras, números, espacios y signos de puntuación comunes.');
    return;
  }
  
    // Si pasa todas las validaciones, envía el texto al backend
    this.apiService.textToSign(this.inputText).subscribe(
      (response) => {
        this.result = response.animations
          .map((animation: any) => animation.letter)
          .join(' '); // Muestra el resultado como letras separadas
      },
      (error) => {
        console.error('Error al procesar el texto:', error);
        this.errorMessage = 'Hubo un error al procesar el texto.';
      }
    );
  }
  
  

  clearText() {
    this.inputText = '';
    this.result = '';
  }
}