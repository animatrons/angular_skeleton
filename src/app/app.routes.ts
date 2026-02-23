import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'forms', loadComponent: () => import('./pages/forms/forms.component').then(m => m.FormsComponent) },
      { path: 'table', loadComponent: () => import('./pages/table/table.component').then(m => m.TableComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
