import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../interfaces/auth';

@Component({
  selector: 'app-user-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-bar.component.html',
  styleUrl: './user-bar.component.scss',
})
export class UserBarComponent {
  public userDetails: IUser[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.initData();
  }

  openDetails(): void {
    this.dialog.open(UserDetailsComponent, {
      data: {},
    });
  }
  initData() {
    this.authService
      .getUserByEmail(sessionStorage.getItem('email') as string)
      .subscribe((res: IUser[]) => {
        this.userDetails = res;
      });
  }
  get email() {
    return this.userDetails[0].email;
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
