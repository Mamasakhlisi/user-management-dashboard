import { Component } from '@angular/core';
import { UserBarComponent } from './user-bar/user-bar.component';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [UserBarComponent, UsersListComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
