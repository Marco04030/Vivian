import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessTextService {
  private apiUrl = 'https://hjzxo8x4c9.execute-api.us-east-1.amazonaws.com/dev/process-text';

  constructor(private http: HttpClient) {}

  processText(text: string): Observable<any> {
    return this.http.post(this.apiUrl, { text });
  }
}
