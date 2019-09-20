import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from './userDTO';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  serverUrl = 'https://books-234.herokuapp.com/api/auth/';
  errorData: {};
  
  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  redirectUrl: string;

  public get currentUserValue(): UserDTO{
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}login`,{email: email,password: password})
    .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }),
      catchError(this.handleError)     
    );
  }

  loginGoogle(token:String){
    return this.http.post<any>(`${this.serverUrl}login-google`,token)
    .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }),
      catchError(this.handleError)
    );
  }
  
    /** CREATE a new user */
  register(user: UserDTO){
      return this.http.post(`${this.serverUrl}sign_up`,user);
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

  getRole(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role;
  }

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
