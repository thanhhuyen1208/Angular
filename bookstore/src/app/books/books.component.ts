import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';
import { ResponseBook } from '../responseBook';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[];
  responseBooks: ResponseBook;

  constructor( private bookService: BookService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getBooks();
  }

  logout() {
    
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(responseBooks => this.books=responseBooks.books);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.bookService.addBook( title )
    .subscribe(book => {
      this.books.push(book);
    });
}

  delete(book: Book): void{
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
  }

}
