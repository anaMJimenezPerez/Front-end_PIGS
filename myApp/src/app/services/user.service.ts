import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '../assets/data/user.json';
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:8080/users/getUsers');
  }

  getProductsUser(userId: number): Observable<any> {
    return this.http.get('http://localhost:8080/users/getProducts?id=' + userId);
  }

  getCountProductsUser(userId: number): Observable<any> {
    return this.http.get('http://localhost:8080/users/countProducts?id=' + userId);
  }

  userCartIsEmpty(userEmail: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === userEmail);
        if (user) {
          return user.cart.length === 0;
        }
        return true;
      })
    );
  }
}
