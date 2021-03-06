import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-admin-edit',
  templateUrl: './book-admin-edit.component.html',
  styleUrls: ['./book-admin-edit.component.scss']
})
export class BookAdminEditComponent implements OnInit {

  public book: Book;
  loading: boolean = false;
  role: string;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private authService: AuthService

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
    this.loading  = true;
  }

  getRole(){
    this.role = this.authService.getRole();
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
