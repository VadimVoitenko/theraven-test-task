import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'theraven-test-task-b0b5c',
          appId: '1:48230265347:web:0f9dfb027abd42fdc85436',
          storageBucket: 'theraven-test-task-b0b5c.appspot.com',
          apiKey: 'AIzaSyCeTa3ygzsJGIGIg2iN6zznsB1sv979QUQ',
          authDomain: 'theraven-test-task-b0b5c.firebaseapp.com',
          messagingSenderId: '48230265347',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideAnimations(),
    provideToastr(),
  ],
}).catch((err) => console.error(err));
