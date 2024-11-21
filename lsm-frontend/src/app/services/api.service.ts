import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api'; // Cambia esto si tu backend tiene otra URL base

  constructor(private http: HttpClient) {}

  // Método para enviar texto al backend y recibir las señas generadas
  textToSign(text: string): Observable<{ signs: string }> {
    return this.http.post<{ signs: string }>(`${this.apiUrl}/text-to-sign`, { text });
  }
}
