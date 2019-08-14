import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

import { BookDetailComponent } from './book-detail/book-detail.component'
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './book-edit/book-edit.component';



const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'login', component: LoginComponent},
  { path: 'books', component: BooksComponent},
  { path: 'books/:id', component: BookDetailComponent},
  { path: 'books/edit/:id', component: BookEditComponent},

  { path: '', component: BooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
