import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                 //api

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component'
import { BooksComponent } from './books/books.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthModule } from './auth.module';
import { httpInterceptorProviders } from './http-interceptors/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ConfigComponent } from './config/config.component';
import { MessagesComponent } from './messages/messages.component';
import { CommentsComponent } from './comments/comments.component';
import { Comment } from './comment';
import { Book } from './book';

// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    BookDetailComponent,
    BooksComponent,
    HeaderComponent,
    ConfigComponent,
    MessagesComponent,
    BookEditComponent,
    CommentsComponent

  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    BrowserAnimationsModule,
    SlickCarouselModule
  ],
  providers: [
    Title,
    httpInterceptorProviders,
    Comment,
    Book
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
