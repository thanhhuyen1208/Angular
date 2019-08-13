import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthModule } from './auth.module';
import { httpInterceptorProviders } from './http-interceptors/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ConfigComponent } from './config/config.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    BookDetailComponent,
    BooksComponent,
    HeaderComponent,
    ConfigComponent,
    MessagesComponent

  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
  ],
  providers: [
    Title,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
