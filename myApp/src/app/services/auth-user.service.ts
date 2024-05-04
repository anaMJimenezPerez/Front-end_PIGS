import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private usersUrl = '../assets/data/user.json';

  private authenticatedKey = 'isAuthenticated';
  private currentUserKey = 'currentUser';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private currentUserSubject = new BehaviorSubject<any | null>(this.getCurrentUser());

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(userEmail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === userEmail && u.password === password);
        if (user) {
          this.setCurrentUser(user);
          this.setIsAuthenticated(true);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.setCurrentUser(null);
    this.setIsAuthenticated(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authenticatedKey) === 'true';
  }

  getLoggedInUserId(): Observable<number | null> {
    const currentUser = this.getCurrentUser();
    return currentUser ? of(currentUser.id) : of(null);
  }

  private setCurrentUser(user: any | null): void {
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

  private getCurrentUser(): any | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }
}
