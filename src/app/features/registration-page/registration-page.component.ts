import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get email() {
    return this.registrationForm.controls['email'];
  }
  get username() {
    return this.registrationForm.controls['username'];
  }
  get password() {
    return this.registrationForm.controls['password'];
  }

  formMessage(text: string) {
    this._snackBar.open(text, '', {
      duration: 3000,
    });
  }

  submit() {
    const data = { ...this.registrationForm.getRawValue() };
    this.authService.registerUser(data as IUser).subscribe(
      (res) => {
        this.router.navigate(['login']);
        this.formMessage('Register successfully');
      },
      (error) => {
        this.formMessage('Error');
      }
    );
  }
}
