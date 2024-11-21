import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment';
import { MainComponent } from './app/pages/main/main.component';
import { AudioComponent } from './app/pages/audio/audio.component';
import { WriteComponent } from './app/pages/write/write.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: MainComponent },
      { path: 'audio', component: AudioComponent },
      { path: 'write', component: WriteComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
