import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Config } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor( private http: HttpClient ) { }

  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get<Config>(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
   
    return throwError(
      'Something bad happened; please try again later.');
  };

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
        this.configUrl, { observe: 'response' }
    );
  }



}
