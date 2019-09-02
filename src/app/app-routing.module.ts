import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookAdminComponent } from './book-admin/book-admin.component';



const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id', component: UserDetailComponent},
  { path: 'users/edit/:id', component: UserEditComponent},
  { path: 'login', component: LoginComponent},
  { path: 'manage-books', component: BookAdminComponent},
  { path: 'books', component: BooksComponent},
  { path: 'books/:id', component: BookDetailComponent},
  { path: 'books/edit/:id', component: BookEditComponent},
  { path: '', component: BooksComponent},
  { path: '404', component: NotFoundComponent }
  //{ path: '**', redirectTo: '404'},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
