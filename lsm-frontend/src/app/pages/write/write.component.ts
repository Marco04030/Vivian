import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
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

  sendText() {
    if (!this.inputText.trim()) {
      alert('Por favor, escribe algún texto antes de enviar.');
      return;
    }

    this.apiService.textToSign(this.inputText).subscribe(
      (response) => {
        this.result = response.signs; // Asigna la respuesta al resultado
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