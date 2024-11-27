import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css'],
  
})
export class AudioComponent {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingTimeout: any; // Para detener el temporizador de 15 segundos si es necesario
  isRecording = false;

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.saveAudioFile(audioBlob);
        };

        this.mediaRecorder.start();
        this.isRecording = true;

        // Configurar el temporizador para detener la grabación automáticamente
        this.recordingTimeout = setTimeout(() => {
          this.stopRecording();
        }, 15000); // 15 segundos en milisegundos
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;

      // Limpiar el temporizador para evitar que intente detener la grabación después de que ya terminó
      clearTimeout(this.recordingTimeout);
    }
  }

  private saveAudioFile(audioBlob: Blob) {
    const a = document.createElement('a');
    const url = URL.createObjectURL(audioBlob);
    a.href = url;
    a.download = 'recording.wav';
    a.click();
    URL.revokeObjectURL(url);
  }
}
