import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { UserDTO } from './userDTO';
import { catchError, tap, map } from 'rxjs/operators';

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




  /**GET users from server */
  getUsers(): Observable<UserDTO[]>{
    return this.http.get<UserDTO[]>(this.userUrl).pipe(
      catchError(this.handleError<UserDTO[]>('getUser'))
    );
  }

  /** GET user by id from server. Will 404 if id is not found */
  getUser(id: number): Observable<UserDTO>{
    const url =`${this.userUrl}/${id}`;
    return this.http.get<UserDTO>(url).pipe(
      tap(_=>this.log(`fetch user id=${id}`)),
      catchError(this.handleError<UserDTO>(`get user id=${id}`))
    );
  }

  /** GET user by id. Return 'undentified' when id not found */
    getHeroNo404<Data>(id: number): Observable<UserDTO> {
      const url = `${this.userUrl}/?id=${id}`;
      return this.http.get<UserDTO[]>(url)
        .pipe(
          map(users => users[0]), // returns a {0|1} element array
          tap(u => {
            const outcome = u ? `fetched` : `did not find`;
            this.log(`${outcome} user id=${id}`);
          }),
          catchError(this.handleError<UserDTO>(`getUser id=${id}`))
        );
    }

  /** DELETE: delete the user from the server */
  deleteUser(user: UserDTO | number): Observable<UserDTO>{
     const id = typeof user === 'number' ? user: user.id;

    const url = `${this.userUrl}/${id}`;

    return this.http.delete<UserDTO>(url, this.httpOptions).pipe(
      tap(_=> this.log(`delete user id=${id}`)),
      catchError(this.handleError<UserDTO>('deleteUser'))
    );
  }
  
  /** PUT: update info user */
updateUser(user: UserDTO | number): Observable<any>{
  const id = typeof user === 'number' ? user: user.id;
  const url = `${this.userUrl}/${id}`;

  return this.http.put<UserDTO>(url, user, this.httpOptions).pipe(
    tap(_ => this.log(`update user id= ${id}`)),
    catchError(this.handleError<UserDTO>('updateUser'))
  );
}

}
