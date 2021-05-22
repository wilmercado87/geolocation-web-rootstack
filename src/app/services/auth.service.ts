import { CONSTANT } from './../components/constants/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(CONSTANT.API_URL + CONSTANT.AUTH_LOGIN, { email, password })
      .pipe(
        tap((_) => console.log('login:')),
        shareReplay(),
        catchError(this.handleError<any>('error login'))
      );
  }

  public logout() {
    localStorage.removeItem(CONSTANT.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANT.EXPIRES_IN);
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  private isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration: any = localStorage.getItem(CONSTANT.EXPIRES_IN);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
