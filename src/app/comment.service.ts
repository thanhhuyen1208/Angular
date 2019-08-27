import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BookService } from './book.service';
import { Comment } from './comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl = 'https://books-234.herokuapp.com/api/comments'    //URL from web api

  private commentsByIdUrl = 'https://books-234.herokuapp.com/api/comments/book_id'

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private bookService: BookService

  ) { }

  private handleError<T> (operation ='operation', result?:T){
    return (error: any): Observable<T> => {

       //console.error(error);
       this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string): void {
    this.messageService.add(`CommentService: ${message}`);
  }

  /** ADD new a new comment to the book */
  addComment(message: string, bookId: number) {
    
    return this.http.post<Comment>(this.commentsUrl, {message, bookId}, this.httpOptions).pipe(
      catchError(this.handleError<Comment>('addComment'))
    )
  }

  /** GET commets of the book by id from server */  
  getComments(id: number): Observable<Comment[]>{

    const url = `${this.commentsByIdUrl}/${id}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(_ => this.log('fetched comments')),
        catchError(this.handleError<Comment[]>('getComment', []))
      );  

  }

  /** PUT-EDIT comment */

  /** DELETE comment from server */
  deleteComment(comment: Comment | number): Observable<Comment>{
    
    const id = typeof comment === 'number' ? comment : comment.id;
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<Comment>(url, this.httpOptions).pipe(
      tap(_=>this.log(`delete comment id = ${id}`)),
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }
}

