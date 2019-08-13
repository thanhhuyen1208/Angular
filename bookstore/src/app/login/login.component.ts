import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  retrunUrl: string;

  error: {};
  loginError: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });

    // this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.loginForm.value);
    this.submitted = true;
    this.authService.login(this.email.value, this.password.value).subscribe((data) => {
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl: '/';
        this.router.navigate([redirect]);
      } else {
        this.loginError = 'Email or password is incorrect.';
      }
    },
    error => this.error = error
    );
  }
}
