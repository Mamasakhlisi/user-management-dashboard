import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';
import { DashboardPageComponent } from './features/dashboard-page/dashboard-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: RegistrationPageComponent },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
