import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private usersUrl = '../assets/data/user.json';

  private authenticatedKey = 'isAuthenticated';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  currentUser$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(userEmail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.email == userEmail && u.password == password);
        localStorage.setItem(this.authenticatedKey, 'true');
        this.isAuthenticatedSubject.next(true); // Emitir nuevo valor al BehaviorSubject
        return !!user; 
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.authenticatedKey);
    this.isAuthenticatedSubject.next(false); // Emitir nuevo valor al BehaviorSubject
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authenticatedKey) === 'true';
  }
  
}
