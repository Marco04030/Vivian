import { Injectable } from '@angular/core';
import { ProcessTextService } from './process-text.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private processTextService: ProcessTextService) {}

  textToSign(text: string) {
    return this.processTextService.processText(text);
  }
}
