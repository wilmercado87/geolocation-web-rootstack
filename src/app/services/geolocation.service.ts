import { User } from './../models/user';
import { Job } from './../models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CONSTANT } from '../components/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getUser() : Observable<User>{
    return this.http.get<User>(CONSTANT.API_URL + CONSTANT.AUTH_ME).pipe(
      tap((_) => console.log('get User:')),
      catchError(this.handleError<User>('error getUser'))
    );
  }

  getJobs() : Observable<Job[]>{
    return this.http.get<Job[]>(CONSTANT.API_URL + CONSTANT.JOBS).pipe(
      tap((_) => console.log('fetched jobs:')),
      catchError(this.handleError<Job[]>('error getJobs', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
