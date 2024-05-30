import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  public formMessage(text: string) {
    this._snackBar.open(text, '', {
      duration: 3000,
    });
  }

  public authUser() {
    const { email, password } = this.loginForm.getRawValue();
    this.authService.getUserByEmail(email as string).subscribe((res) => {
      if (res.length && res[0].password === password) {
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['/dashboard']);
      } else {
        this.formMessage('Error');
      }
    });
  }
}
