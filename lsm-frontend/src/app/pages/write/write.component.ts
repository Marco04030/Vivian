import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
})
export class WriteComponent {
  inputText = ''; // Texto que el usuario ingresa
  result = '';    // Resultado devuelto por el backend

  constructor(private apiService: ApiService) { }

  sendText() {
    if (!this.inputText.trim()) {
      alert('Por favor, escribe algún texto antes de enviar.');
      return;
    }

    // 1) Enviar el texto al iframe de Unity (si deseas rotar con "A" o "B")
    const direction = this.inputText.trim(); // "A" o "B" (o cualquier string)
    const msg = {
      type: 'rotate',
      direction: direction
    };

    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(msg, '*');
    }

    // 2) Llamar al servicio backend
    this.apiService.textToSign(this.inputText).subscribe(
      (response) => {
        this.result = response.signs; // Ejemplo de asignación de la respuesta
      },
      (error) => {
        console.error('Error al procesar el texto:', error);
        this.result = 'Hubo un error al procesar el texto.';
      }
    );
  }

  clearText() {
    this.inputText = '';
    this.result = '';
  }
}
