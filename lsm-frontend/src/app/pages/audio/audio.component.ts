import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [RouterModule], // Para navegar de regreso al MainComponent
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css'],
})
export class AudioComponent {}
