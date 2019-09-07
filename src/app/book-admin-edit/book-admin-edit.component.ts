import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-admin-edit',
  templateUrl: './book-admin-edit.component.html',
  styleUrls: ['./book-admin-edit.component.scss']
})
export class BookAdminEditComponent implements OnInit {

  book: Book;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private location: Location

  ) { }

  ngOnInit() {
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
    this.bookService.updateBook(this.book).subscribe(() => this.goBack() );
  }
}
