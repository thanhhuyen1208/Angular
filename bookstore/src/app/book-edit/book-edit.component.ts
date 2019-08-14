import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../book.service';

import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  
  @Input() book: Book;

  constructor(
    private bookService: BookService,
    private location: Location,
    private router: ActivatedRoute
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


}
