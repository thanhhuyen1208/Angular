import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BookService } from '../book.service';
import { Book } from '../book';
import { ResponseBook } from '../responseBook';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-book-admin',
  templateUrl: './book-admin.component.html',
  styleUrls: ['./book-admin.component.scss']
})
export class BookAdminComponent implements OnInit {

  itemsUser: MenuItem[];
  itemsBook: MenuItem[];
  cols: { field: string; header: string; }[];

  books: Book[];

  constructor(
    private messageService: MessageService,
    private bookService: BookService
  ) { }

  ngOnInit() {

    this.itemsBook = [{
      label: 'Books',
      icon: 'ti ti-book',
    }],

      this.itemsUser = [{
        label: 'Users',
        icon: 'ti ti-user',
      },
      ];

    this.getBooks();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' },
      { field: 'createdAt', header: 'Create At' },
      { field: 'enable', header: 'Actived'},
    ];
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books=books);

  }

  delete(book: Book): void{
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
    this.messageService.clear('c');
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

onReject() {
  this.messageService.clear('c');
}

}
