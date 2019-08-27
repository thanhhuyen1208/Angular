import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                 //api

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


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
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng'; 
import { PanelModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NotFoundComponent } from './not-found/not-found.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookDetailComponent,
    BooksComponent,
    HeaderComponent,
    ConfigComponent,
    MessagesComponent,
    BookEditComponent,
    CommentsComponent,
    UsersComponent,
    UserDetailComponent,
    UserEditComponent,
    NotFoundComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    BrowserAnimationsModule,
    SlickCarouselModule,
    DataViewModule,
    DropdownModule,
    PaginatorModule,
    TreeTableModule,
    PanelModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    CalendarModule,
    TableModule
    
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
