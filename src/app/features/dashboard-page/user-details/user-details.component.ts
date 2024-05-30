import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../../interfaces/auth';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    id: [''],
  });
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authService
      .getUserByEmail(sessionStorage.getItem('email') as string)
      .subscribe((res: IUser[]) => {
        this.userDetailsForm.patchValue(res[0]);
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateUserDetails() {
    this.usersService
      .updateDetails(this.userDetailsForm.getRawValue() as IUser)
      .subscribe((res) => console.log(res));
  }
}
