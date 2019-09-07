import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { element } from 'protractor';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  retrunUrl: string;
  loading: boolean = false;
  remember: boolean;

  error: {};
  loginError: string;
  clientId: string = '10558520426-5epndmc1a1dgsjvffftbvn60rr6521hh.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private element: ElementRef
  ) {
    console.log('ElementRef: ', this.element);
  }

  ngOnInit() {
    this.googleInit();

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.email.value, this.password.value).subscribe((data) => {
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/books';
        this.router.navigate([redirect]);
      } else {
        this.loginError = 'Email or password is incorrect.';
      }
    },
      error => this.error = error
    );
  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '10558520426-5epndmc1a1dgsjvffftbvn60rr6521hh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}