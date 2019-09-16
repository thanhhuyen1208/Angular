import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../book.service';

import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  
  book: Book;
  commentForm: FormGroup;
  role: string;
  today = new Date();

  constructor(
    private bookService: BookService,
    private location: Location,
    private router: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
      ) { }

  ngOnInit( ) { 
   this.getBook();  
   }

   getBook(): void {
     const id = +this.router.snapshot.paramMap.get('id');
     this.bookService.getBook(id).subscribe(book => this.book = book);
   }

   goBack(): void {
     this.location.back();
   }
  
   save(): void {
     this.bookService.updateBook(this.book).subscribe(() => this.goBack());
   }

   checkLogin():boolean{
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getRole(){
    this.role = this.authService.getRole();
  }

}
