import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./images-page/images-page.component').then(
        (c) => c.ImagesPageComponent
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./upload-page/upload-page.component').then(
        (c) => c.UploadPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
