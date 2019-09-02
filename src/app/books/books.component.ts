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

  today = new Date();

  slides = [
    {img: "assets/images/blog-slide1.jpg"},
    {img: "assets/images/blog-slide2.jpg"},
    {img: "assets/images/blog-slide3.jpg"},
    {img: "assets/images/blog-slide4.jpg"},
    {img: "assets/images/blog-slide5.jpg"},
    {img: "assets/images/blog-slide6.jpg"}
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 4, "autoplay":true, "autoplay-speed": 100};
  
  books: Book[];
  responseBooks: ResponseBook;

  constructor( private bookService: BookService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getBooks();
  }

  logout() {
    
      localStorage.removeItem('currentUser');
      this.router.navigate(['/books']);
  }

  getBooks(): void {
    this.bookService.getRespBooks().subscribe(responseBooks => this.books=responseBooks.books);
  }

  add(title: string, author:string): void {
    title = title.trim();

    if (!title) { return; }
    this.bookService.addBook( title, author )
    .subscribe(book => {
      this.books.push(book);
    });
  }

  delete(book: Book): void{
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
  }

}
