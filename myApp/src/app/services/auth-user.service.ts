import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private usersUrl = '../assets/data/user.json';


  isAuthenticated$ = this.isAuthenticated();

  private authenticatedKey = 'isAuthenticated';

  constructor(private http: HttpClient) { }

  login(userEmail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.email == userEmail && u.password == password);
        localStorage.setItem(this.authenticatedKey, 'true');
        return !!user; 
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.authenticatedKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.authenticatedKey) === 'true';
  }
  
}
