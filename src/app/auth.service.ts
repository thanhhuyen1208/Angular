import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'https://books-api-456.herokuapp.com/';
  errorData: {};

  constructor(private http: HttpClient) { }

  redirectUrl: string;

  login(email: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}api/auth/login`,{email: email,password: password})
    .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }),
      catchError(this.handleError)
    );
  }

  isLoggedIn(){
    if (localStorage.getItem(`currentUser`)) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  // logout() {
  //   localStorage.removeItem('currentUser')
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);   
    }

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try it later.'
    };
    return throwError(this.errorData);
  }
  
}
