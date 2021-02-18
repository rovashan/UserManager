import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './models/user';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  constructor(private http: HttpClient) { }

  getUserSubject(): Observable<number> {
    return this.userSubject.asObservable();
  }

  setUserSubject() {
    this.userSubject.next(1);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/users');
  }

  addUser(user: User): Observable<User> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);

    return this.http.post<User>(API_URL + '/users', body, { 'headers': headers });
  }
}
