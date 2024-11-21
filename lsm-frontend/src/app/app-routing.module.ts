import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AudioComponent } from './pages/audio/audio.component';
import { WriteComponent } from './pages/write/write.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'write', component: WriteComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirige rutas no existentes a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

