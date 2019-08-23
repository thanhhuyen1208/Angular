import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { UserDTO } from './userDTO';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'https://books-234.herokuapp.com/api/users'

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
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

  // /** GET user by id from server. Will 404 if id is not found */
  // getUser(id: number): Observable<UserDTO>{
        
  // }

  /**GET users from server */
  getUsers(): Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(this.userUrl).pipe(
      catchError(this.handleError<UserDTO[]>('getUser'))
    );

  }

  // /** PUT: update info user */{
    
  // }

}
