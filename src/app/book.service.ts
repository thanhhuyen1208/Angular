import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { ResponseBook } from './responseBook'
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'https://books-234.herokuapp.com/api/books';   //URL to web api


  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };
 

  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  private handleError<T> (operation ='operation', result?:T){
    return (error: any): Observable<T> => {

       console.error(error);
       this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  /** GET responsed books from server */
  getRespBooks(): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(this.booksUrl).pipe(
      catchError(this.handleError<ResponseBook>('getBooks'))
    );
  }

  /** GET books from server */
  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.booksUrl}/myBooks`).pipe(
      catchError(this.handleError<Book[]>('getAllBooks'))
    );
  }

  /** GET book by id from server. Will 404 if id is not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }
  private log(message: string): void {
    this.messageService.add(`BookService: ${message}`);
  }

  /** GET book by id. Return 'undefined' when id not found */
  getBookNo404<Data>(id: number): Observable<Book>{
    const url = `${this.booksUrl}/?id=${id}`;
    return this.http.get<Book[]>(url)
    .pipe(
      map(book => book[0]),
      tap(b => {
        const outcome = b ? `fetched` : `did not find`;
        // this.log(`${outcome} book id=${id}`);
      }),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addBook(title : string, author: string): Observable<Book>{
    
    return this.http.post<Book>(this.booksUrl, {title, author}, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete book from the server */
  deleteBook(book: Book | number): Observable<Book>{
    const id = typeof book === 'number' ? book: book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  /** PUT: update book on the server */
  updateBook(book: Book | number): Observable<any>{
    const id = typeof book === 'number' ? book: book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.put<Book>(url, book , this.httpOptions).pipe(
      tap(_ => this.log(`update book id=${id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }
}
