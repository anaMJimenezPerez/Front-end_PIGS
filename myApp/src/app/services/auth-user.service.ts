import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private authenticatedKey = 'isAuthenticated';
  private currentUserKey = 'currentUser';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}


  login(userEmail: string, password: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/login?password=${password}&email=${userEmail}`).pipe(
      tap((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.setIsAuthenticated(true);
        }
      }),
      map((user: User) => ({
        isAuthenticated: !!user,
        user: user
      }))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  signup(user: User ): Observable<User>{
    return this.http.post<User>('http://localhost:8080/users/signup', user, this.httpOptions);
  }
  logout(): void {
    this.setCurrentUser(null);
    this.setIsAuthenticated(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authenticatedKey) === 'true';
  }

  getLoggedInUserId(): Observable<number> {
    const currentUser = this.getCurrentUser();
    return currentUser ? of(currentUser.id) : of(null);
  }

  getLoggedUser(): User{
    return this.getCurrentUser();
  }

  private setCurrentUser(user: any): void {
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.currentUserKey);
    }
    this.currentUserSubject.next(user);
  }

  private setIsAuthenticated(isAuthenticated: boolean): void {
    localStorage.setItem(this.authenticatedKey, isAuthenticated.toString());
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  private getCurrentUser(): any {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  getLoggedInUser(): Observable<User | null> {
    const currentUser = this.getCurrentUser();
    return currentUser ? of(currentUser) : of(null);
  }
}
