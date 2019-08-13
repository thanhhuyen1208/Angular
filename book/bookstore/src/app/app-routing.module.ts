import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';

import { BookDetailComponent } from './book-detail/book-detail.component'
import { BooksComponent } from './books/books.component';



const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'login', component: LoginComponent},
  { path: 'books', component: BooksComponent},
  { path: 'detail', component: BookDetailComponent},
  { path: '', component: BooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
