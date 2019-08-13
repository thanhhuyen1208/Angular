import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { ResponseBook } from './responseBook'
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'https://books-api-456.herokuapp.com/api/books';   //URL to web api


  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,

  ) { }

  private handleError<T> (operation ='operation', result?:T){
    return (error: any): Observable<T> => {

      // console.error(error);

      return of(result as T);
    }
  }

  /** GET books from server */
  getBooks(): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(this.booksUrl).pipe(
      catchError(this.handleError<ResponseBook>('getBooks'))
    );
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
  addBook(title : string): Observable<Book>{
    //  return true
    return this.http.post<Book>(this.booksUrl, {title}, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete book from the server */
  deleteBook(books: Book | number): Observable<Book>{
    const id = typeof books === 'number' ? books: books.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

}


